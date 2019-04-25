import React, { Component } from '../../../../node_modules/react';
import { Link } from '../../../../node_modules/react-router-dom';
import Card from './Card';
import NotFound from '../../partials/NotFound';
import { Animated } from "react-animated-css";
import PropTypes from '../../../../node_modules/prop-types';
import AppBar from '../../../../node_modules/@material-ui/core/AppBar';
import Tabs from '../../../../node_modules/@material-ui/core/Tabs';
import Tab from '../../../../node_modules/@material-ui/core/Tab';
import Typography from '../../../../node_modules/@material-ui/core/Typography';

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 10 }}>
        {props.children}
      </Typography>
    );
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
    },
  });
  
  
export class ArticlesPage extends Component {

    state = {
        articles: [],
        value: 0,
        sort: undefined,
        parameter: undefined,
        url: "https://baas.kinvey.com/appdata/kid_HkMAqLj9N/articles",
        onPageCount: 12,
        page: 1,
        totalArticlesCount: 0,
        skippedArticles: 0,
        validSortTypes: {
          asc: true,
          desc: true
        },
        validParameterTypes: {
          Title: true,
          entryId: true,
          views: true
        }
    };

    handleChange = (event, value) => {
      this.setState({ value });
    };

    onChange = () => {
      document.querySelector("#moreBtn").textContent = "Още статии";
      let criterias = document.getElementById("sort-criteria").value.split(":");

      let sort = criterias[1];
      let parameter = criterias[0];

      this.fetchArticles(sort, parameter, 0, false);
    }

    onClick = () => {
      let skipAmount = Array.from(document.querySelectorAll(".article")).length;

      if(this.state.totalArticlesCount > skipAmount){
        this.fetchArticles(this.state.sort, this.state.parameter, skipAmount, true);
      } else {
        let moreBtn = document.querySelector("#moreBtn");
        moreBtn.textContent = "Няма повече статии";
      }
    }

    fetchArticles(sort, parameter, skipAmount, append) {
      let oldArticles = this.state.articles;
      this.setState({articles: []});

      let searchText = document.querySelector("#search-box").value;
      let baseUrl = encodeURI(this.state.url + '?limit=' + this.state.onPageCount + '&skip=' + skipAmount);
      
      if(searchText.length !== 0){
        baseUrl = baseUrl + ('&query={"Title":{"$regex":"^' + searchText + '"} }');
      } 

      if(sort !== undefined && parameter !== undefined){
        if(sort === "asc"){
          baseUrl = (baseUrl + '&sort={"' + parameter + '":1}');
        } else if(sort === "desc"){
          baseUrl = (baseUrl + '&sort={"' + parameter + '":-1}');
        }
      }

      fetch(baseUrl, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic a2lkX0hrTUFxTGo5TjpmNzE2ZjcxZThkNjk0OTIwYWUzZDQ5MGU5NDEwMTJjZQ=="
        }
      }).then((data) => {
        return data.json();
      }).then((articles) => {
        if(parameter === "Date"){
          if(append){
            let newArticles = articles;

            this.setState({articles: oldArticles.concat(newArticles)});   
          } else{
            let notFound = document.querySelector("#not-found");
            let moreBtn = document.querySelector("#moreBtn");

            if(articles.length === 0){
              moreBtn.style.display = "none";
              notFound.style.display = "block";
            } else {
              moreBtn.style.display = "block";
              notFound.style.display = "none";
            }
            this.setState({articles: articles});
          }
        } else {
          if(append){
            let newArticles = articles;

            this.setState({articles: oldArticles.concat(newArticles)});   
          } else {
            let notFound = document.querySelector("#not-found");
            let moreBtn = document.querySelector("#moreBtn");

            if(articles.length === 0){
              if(moreBtn){
                moreBtn.style.display = "none";
              } else if(notFound){
                notFound.style.display = "block";
              }
            } else {
              if(moreBtn){
                moreBtn.style.display = "block";
              } else if(notFound){
                notFound.style.display = "none";
              }
            }

            this.setState({articles: articles});
          }
        }
      });
      
    }

    fetchArticlesCount(){
      fetch(this.state.url + "/_count", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic a2lkX0hrTUFxTGo5TjpmNzE2ZjcxZThkNjk0OTIwYWUzZDQ5MGU5NDEwMTJjZQ=="
        }
      }).then((data) => {
        return data.json();
      }).then((data) => {
        this.setState({totalArticlesCount: data.count});
      });
    }

    onSearch = () => {
      let oldArticles = this.state.articles;
      this.setState({articles: []});

      document.querySelector("#moreBtn").textContent = "Още статии";  
      let searchText = document.querySelector("#search-box").value;
      
      let selectCriteria = document.querySelector("#sort-criteria");
      selectCriteria.selectedIndex = 0;

      if(searchText.length === 0){
        this.fetchArticles(this.state.sort, this.state.perameter, 0);
      } else {
        fetch(encodeURI(this.state.url + '?query={"Title":{"$regex":"^' + searchText + '"} }'), {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic a2lkX0hrTUFxTGo5TjpmNzE2ZjcxZThkNjk0OTIwYWUzZDQ5MGU5NDEwMTJjZQ=="
          }
        }).then((data) => {
          return data.json();
        }).then((articles) => {
          let notFound = document.querySelector("#not-found");
          let moreBtn = document.querySelector("#moreBtn");

          if(articles.length === 0){
            if(moreBtn){
              moreBtn.style.display = "none";
            } else if(notFound){
              notFound.style.display = "block";
            }
          } else {
            if(moreBtn){
              moreBtn.style.display = "block";
            } else if(notFound){
              notFound.style.display = "none";
            }
          }

          this.setState({articles: articles});
        });
      }
    }

    componentDidMount() {
      // Initial loading of the articles
      this.fetchArticles(this.state.sort, this.state.perameter, 0);

      // Getting the count of the articles
      this.fetchArticlesCount();

      document.addEventListener('fetchStart', function() {
        let moreBtn = document.querySelector("#moreBtn");
        if(moreBtn){
          moreBtn.style.display = "none";
        }
      });

      document.addEventListener('fetchEnd', function() {
        let moreBtn = document.querySelector("#moreBtn");
        if(moreBtn){
          setTimeout(function(){
            moreBtn.style.display = "block";
          }, 1000);
        }
      });
    }

    render() {
      const { value } = this.state;
      return (
          <div id="articles" className="w-70 mx-10-auto text-center">
              <AppBar position="static" className="mt-50" color="inherit">
                  <Tabs 
                      value={value} 
                      indicatorColor="primary"
                      variant="fullWidth">
                      <Tab label="Статии" />
                  </Tabs>
              </AppBar>
            {value === 0 && 
              <TabContainer>
            <Animated animationIn="fadeIn">
            <div className="equal-shared-grid mx-auto w-70">
              <div className="text-start mx-auto">
                <select id="sort-criteria" className="p-10 custom-select font-16" onChange={this.onChange}>
                  <option>Сортирай</option>
                  <option value="entryId:asc" >По дата възходящо</option>
                  <option value="Title:asc">По име възходящо</option>
                  <option value="entryId:desc">По дата низходящо</option>
                  <option value="Title:desc">По име низходящо</option>
                  <option value="views:asc">По преглеждания възходящо</option>
                  <option value="views:desc">По преглеждания низходящо</option>
                </select>
              </div>
              <div className="text-end">
              <input id="search-box" onKeyUp={this.onSearch} className="p-10 custom-select font-16" placeholder="Търси по име..."/>
            </div>
            </div>
              <NotFound />
              <div className="four-fragments-grid">
              {Array.from(this.state.articles).map((art) => {
                let toRoute = "/article/" + art._id;
                return (<Link key={art._id} to={toRoute}><Card date={art.Date} views={art.views} cover={art.Cover} title={art.Title.substr(0, 10) + "..."}/></Link>);
              })} 
              </div>
              <span onClick={this.onClick} id="moreBtn" className="moreBtn mt-25 display-block" >Още статии</span>
            </Animated>
          </TabContainer>}
          </div>
    )
  }
}

export default ArticlesPage;