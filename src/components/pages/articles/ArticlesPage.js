import React, { Component } from '../../../../node_modules/react';
import { Link } from '../../../../node_modules/react-router-dom';
import Card from './Card';
import NotFound from '../../partials/NotFound';
import Select from '../../partials/SortSelect';
import { Animated } from "react-animated-css";
import PropTypes from '../../../../node_modules/prop-types';
import AppBar from '../../../../node_modules/@material-ui/core/AppBar';
import Tabs from '../../../../node_modules/@material-ui/core/Tabs';
import Tab from '../../../../node_modules/@material-ui/core/Tab';
import Typography from '../../../../node_modules/@material-ui/core/Typography';
import RequestModel from '../../RequestModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { O_APPEND } from 'constants';

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

export class ArticlesPage extends RequestModel {
   _isMounted = false;

    state = {
        articles: [],
        defaultMoreBtn: "",
        value: 0,
        sort: undefined,
        parameter: undefined,
        url: this.props.url + "/articles",
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
        },
        oldArticles: []
    };

    handleChange = (event, value) => {
      if(this._isMounted){
        this.setState({ value });
      }
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
        this.clearButtons();
      }
    }

    handleNotFound(){
      let searchText = document.querySelector("#search-box");

      let articles = document.querySelectorAll(".article");

      let notFound = document.querySelector("#not-found");
      
      if(searchText && articles){
        if(searchText.value.length > 0){
          if(articles.length === 0){
            if(notFound){
              notFound.style.display = "block";
            }
          } else {
            if(notFound){
              notFound.style.display = "none";
            }
          }
        }
      }
    }

    clearButtons(){
      let articles = document.querySelectorAll(".article");

      let moreBtn = document.querySelector("#moreBtn");
      let noMoreBtn = document.querySelector("#noMoreBtn");

      if(articles.length === 0){
        if(moreBtn){
          moreBtn.style.display = "none";
        } 
        
        if(noMoreBtn){
          noMoreBtn.style.display = "block";
        } 

      } else {
        if(moreBtn){
          moreBtn.style.display = "block";
        } 

        if(noMoreBtn){
          noMoreBtn.style.display = "none";
        } 

      }
    }

    componentWillUnmount(){
      this._isMounted = false;
    }

    fetchArticles(sort, parameter, skipAmount, append) {
      if(this._isMounted){
        this.setState({oldArticles: this.state.articles});
        this.setState({articles: []});  
      }

      document.querySelector("#search-box").value = "";
      let queryString = '?limit=' + this.state.onPageCount + '&skip=' + skipAmount;

      if(sort !== undefined && parameter !== undefined){
        if(sort === "asc"){
          queryString += '&sort={"' + parameter + '":1}';
        } else if(sort === "desc"){
          queryString += '&sort={"' + parameter + '":-1}';
        }
      }

      this.get.apply(this, ["/articles", queryString, undefined, append, "articles"]);
    }

    fetchArticlesCount() {
      this.get.apply(this, ["/articles", "/_count", undefined, false, this._isMounted, "totalArticlesCount"]);
    }

    onSearch = () => {
      if(this._isMounted){
        this.setState({articles: []});
      }

      document.querySelector("#moreBtn").textContent = "Още статии";  
      let searchText = document.querySelector("#search-box").value;
      
      let selectCriteria = document.querySelector("#sort-criteria");
      selectCriteria.selectedIndex = 0;

      if(searchText.length === 0){
        this.fetchArticles(this.state.sort, this.state.perameter, 0);
      } else {
        this.get.apply(this, ["/articles", '?query={"Title":{"$regex":"^' + searchText + '"} }', undefined, false, this._isMounted, "articles"]);
      }
    }

    componentDidMount() {
      this._isMounted = true;

      // Initial loading of the articles
      this.fetchArticles(this.state.sort, this.state.perameter, 0);

      // Getting the count of the articles
      this.fetchArticlesCount();

      let callback = this.clearButtons;
      let notFound = this.handleNotFound;

      document.addEventListener('fetchStart', function() {
        callback();
      });

      document.addEventListener('fetchEnd', function() {
        callback();
        notFound();
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
                <Select onChange={this.onChange.bind(this)}/>
                <div className="mx-10-auto p-10">
                <input id="search-box" onKeyUp={this.onSearch} className="responsive-input custom-select font-16" placeholder="Търси по име..."/>
              </div>
              </div>
                <NotFound />
                <div className="four-fragments-grid">
                  {Array.from(this.state.articles).map((art) => {
                    if(art._id && art.Author && art.Title && art.Cover && art.Content && art.views && art.Date){
                      let toRoute = "/article/" + art._id;
                      return (<Link key={art._id} to={toRoute}><Card date={art.Date} views={art.views} cover={art.Cover} title={art.Title.substr(0, 10) + "..."}/></Link>);
                    }
                  })} 
              </div>
              <span onClick={this.onClick} id="moreBtn" className="moreBtn text-nav mt-25 display-block" ><FontAwesomeIcon icon="chevron-circle-down" size="3x" /></span>
              <span onClick={this.onClick} id="noMoreBtn" className="text-dark-red display-block noMoreBtn mt-25 display-block" ><FontAwesomeIcon icon="times-circle" size="3x" /></span>
            </Animated>
          </TabContainer>}
          </div>
    )
  }
}

export default ArticlesPage;