import React from '../../../../node_modules/react';
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

export class ArticlesPage extends RequestModel {
   _isMounted = false;

    constructor(props){
      super(props);
      
      this.state = {
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
    }

    onChange = () => {
      let moreBtn = document.querySelector("#moreBtn");
      let noMoreBtn = document.querySelector("#noMoreBtn");

      if(moreBtn){
        moreBtn.style.display = "block";
      } 
      
      if(noMoreBtn){
        noMoreBtn.style.display = "none";
      } 

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
        let noMoreBtn = document.querySelector("#noMoreBtn");
  
        if(moreBtn){
          moreBtn.style.display = "none";
        } 
        
        if(noMoreBtn){
          noMoreBtn.style.display = "block";
        } 
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

      let queryString = '?limit=' + this.state.onPageCount + '&skip=' + skipAmount;

      let searchText = document.querySelector("#search-box").value;
      if(searchText.length > 0){
        queryString += '&query={"Title":{"$regex":"^' + searchText + '"} }';
      }

      if(sort !== undefined && parameter !== undefined){
        if(sort === "asc"){
          queryString += '&sort={"' + parameter + '":1}';
        } else if(sort === "desc"){
          queryString += '&sort={"' + parameter + '":-1}';
        }
      }

      this.get.apply(this, ["/articles", queryString, undefined, append, this._isMounted, "articles"]);
    }

    fetchArticlesCount() {
      this.get.apply(this, ["/articles", "/_count", undefined, false, this._isMounted, "totalArticlesCount"]);
    }

    onSearch = () => {
      if(this._isMounted){
        this.setState({articles: []});
      }

      let moreBtn = document.querySelector("#moreBtn");
      let noMoreBtn = document.querySelector("#noMoreBtn");

      if(noMoreBtn){
        noMoreBtn.style.display = "none";
      }
      if(moreBtn){
        moreBtn.style.display = "block";
      }

      let searchText = document.querySelector("#search-box").value;
      
      let selectCriteria = document.querySelector("#sort-criteria");
      selectCriteria.selectedIndex = 0;

      if(searchText.length === 0){
        let notFound = document.querySelector("#not-found");
      
        if(notFound){
          notFound.style.display = "none";
        } 
          
        this.fetchArticles(this.state.sort, this.state.perameter, 0);
      } else {
        this.get.apply(this, ["/articles", '?query={"Title":{"$regex":"^' + searchText + '"} }', this.handleNotFound.bind(this), false, this._isMounted, "articles"]);
      }
    }

    componentDidMount() {
      this._isMounted = true;

      // Initial loading of the articles
      this.fetchArticles(this.state.sort, this.state.perameter, 0);

      // Getting the count of the articles
      this.fetchArticlesCount();

      let callback = this.clearButtons;

      document.addEventListener('fetchStart', function() {
        callback();
      });

      document.addEventListener('fetchEnd', function() {
        callback();
      });
    }

    render() {
      return (
          <section id="articles" className="w-70 mx-10-auto text-center">
            <header><h2 className="font-40 mt-50 p-0">Статии</h2></header>
            <Animated animationIn="fadeIn">
              <section className="equal-shared-grid mx-auto w-70">
                <Select onChange={this.onChange.bind(this)}/>
                <section className="mx-10-auto p-10">
                <input id="search-box" onKeyUp={this.onSearch} className="responsive-input custom-select font-16" placeholder="Търси по име..."/>
              </section>
              </section>
                <NotFound />
              <section className="four-fragments-grid">
                  {Array.from(this.state.articles).map((art) => {
                    let editedTitle = art.Title.replace(/[-?.!,]+/g, "").replace(/\s+/g, "-");
                    let titleParts = editedTitle.split("-");

                    if(titleParts.length > 3){
                      editedTitle = titleParts.slice(0, 3).join("-");
                    }
                    
                    editedTitle = "Лайфстайл-" + editedTitle;

                    let toRoute = "/article/" + editedTitle + "-" + art._id;
                    return (<Link key={art._id} to={toRoute}><Card date={art.Date} id={art._id} views={art.views} cover={art.Cover} title={art.Title.substr(0, 20) + "..."}/></Link>);
                  })} 
              </section>
              <FontAwesomeIcon onClick={this.onClick} id="moreBtn" className="moreBtn text-nav mx-auto mt-25 display-block"  icon="chevron-circle-down" size="3x" />
              <FontAwesomeIcon onClick={this.onClick} id="noMoreBtn" className="text-dark-red mx-auto display-block noMoreBtn mt-25 display-block"  icon="times-circle" size="3x" />
            </Animated>
          </section>
    )
  }
}

export default ArticlesPage;