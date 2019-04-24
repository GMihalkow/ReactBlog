import React, { Component } from '../../../../node_modules/react';
import { Link } from '../../../../node_modules/react-router-dom';
import Card from './Card';
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
          Date: true,
          views: true
        }
    };

    handleChange = (event, value) => {
      this.setState({ value });
    };

    onChange = () => {
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
      if(sort === undefined || parameter === undefined){
        fetch(this.state.url + "?limit=" + this.state.onPageCount + "&skip=" + skipAmount, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic a2lkX0hrTUFxTGo5TjpmNzE2ZjcxZThkNjk0OTIwYWUzZDQ5MGU5NDEwMTJjZQ=="
          }
        }).then((data) => {
          return data.json();
        }).then((articles) => {
          if(append){
            let newArticles = articles;

            this.setState({articles: this.state.articles.concat(newArticles)});                   
          } else {
            this.setState({articles: articles, skippedArticles: skipAmount});
          }
        });
      } else {
        if(this.state.validSortTypes[sort] === true && this.state.validParameterTypes[parameter] === true){
          if(sort === "asc"){
            fetch(encodeURI(this.state.url + '?limit=' + this.state.onPageCount + '&skip=' + skipAmount + '&sort={"' + parameter + '":1}'), {
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
                  let newArticles = articles.sort((a, b) => {
                    let date1 = new Date(a[parameter]).getTime();
                    let date2 = new Date(b[parameter]).getTime();

                    return date1 - date2;
                  });

                  this.setState({articles: this.state.articles.concat(newArticles)});   
                } else{
                  this.setState({articles: articles.sort((a, b) => {
                    let date1 = new Date(a[parameter]).getTime();
                    let date2 = new Date(b[parameter]).getTime();
                      return date1 - date2;
                    })
                  });
                }
              } else {
                if(append){
                  let newArticles = articles;

                  this.setState({articles: this.state.articles.concat(newArticles)});   
                } else {
                  this.setState({articles: articles});
                }
              }
            });
          } else {
            fetch(encodeURI(this.state.url + '?limit=' + this.state.onPageCount + '&skip=' + skipAmount + '&sort={"' + parameter + '":-1}'), {
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
                  let newArticles = articles.sort((a, b) => {
                    let date1 = new Date(a[parameter]).getTime();
                    let date2 = new Date(b[parameter]).getTime();
  
                    return date2 - date1;
                  });
  
                  this.setState({articles: this.state.articles.concat(newArticles)});   
                } else {
                  let newArticles = articles.sort((a, b) => {
                    let date1 = new Date(a[parameter]).getTime();
                    let date2 = new Date(b[parameter]).getTime();
  
                    return date2 - date1;
                  });
                  this.setState({articles: newArticles});   
                }
              } else {
                if(append){
                  let newArticles = articles;

                  this.setState({articles: this.state.articles.concat(newArticles)});   
                } else {
                  this.setState({articles: articles});
                }
              }
            });
          }
          
          this.setState({ sort: sort, parameter: parameter });
        }
      }
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
      let searchText = document.querySelector("#search-box").value;

      if(searchText.length === 0){
        document.querySelector("#moreBtn").style.display = "block";
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
            this.setState({articles: articles});
            document.querySelector("#moreBtn").style.display = "none";
        });
      }
    }

    componentDidMount() {
      // Initial loading of the articles
      this.fetchArticles(this.state.sort, this.state.perameter, 0);

      // Getting the count of the articles
      this.fetchArticlesCount();
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
            <Animated animationIn="fadeIn" animationInDelay={1500}>
            <div className="equal-shared-grid mx-auto w-70">
              <div className="text-start mx-auto">
                <select id="sort-criteria" className="p-10 custom-select font-16" onChange={this.onChange}>
                  <option defaultValue>Сортирай</option>
                  <option value="Date:asc">По дата възходящо</option>
                  <option value="Title:asc">По име възходящо</option>
                  <option value="Date:desc">По дата низходящо</option>
                  <option value="Title:desc">По име низходящо</option>
                  <option value="views:asc">По преглеждания възходящо</option>
                  <option value="views:desc">По преглеждания низходящо</option>
                </select>
              </div>
              <div className="text-end">
              <input id="search-box" onKeyUp={this.onSearch} className="p-10 custom-select font-16" placeholder="Търси по име..."/>
            </div>
            </div>
              <div className="four-fragments-grid">
              {Array.from(this.state.articles).map((art) => {
                let toRoute = "/article/" + art._id;
                return (<Link key={art._id} to={toRoute}><Card date={art.Date} views={art.views} cover={art.Cover} title={art.Title.substr(0, 10) + "..."}/></Link>);
              })} 
              </div>
            </Animated>
            <span onClick={this.onClick} id="moreBtn" className="mt-25 display-block" >Още статии</span>
          </TabContainer>}
          </div>
    )
  }
}

export default ArticlesPage;