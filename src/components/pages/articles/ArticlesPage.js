import React from '../../../../node_modules/react';
import { Link } from '../../../../node_modules/react-router-dom';
import Card from './Card';
import NotFound from '../../partials/NotFound';
import Select from '../../partials/SortSelect';
import { Animated } from "react-animated-css";
import ArticleYearsCheckBoxes from "../../partials/ArticleYears.js";
import PropTypes from '../../../../node_modules/prop-types';
import RequestModel from '../../RequestModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/article.css';

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
          onPageCount: 6,
          page: 1,
          totalArticlesCount: 0,
          skippedArticles: 0,
          validSortTypes: {
            asc: true,
            desc: true
          },
          yearWritten: ".*",
          validParameterTypes: {
            Title: true,
            entryId: true,
            views: true
          },
          oldArticles: []
      };
    }

    onChange = () => {
      var _this = this;

      var moreBtn = document.querySelector("#moreBtn");
      var noMoreBtn = document.querySelector("#noMoreBtn");

      if(moreBtn){
        moreBtn.style.display = "block";
      } 
      
      if(noMoreBtn){
        noMoreBtn.style.display = "none";
      } 

      var criterias = document.getElementById("sort-criteria").value.split(":");

      var sort = criterias[1];
      var parameter = criterias[0];

      _this.setState({sort: sort, parameter: parameter}, _this.fetchArticles.bind(_this, sort, parameter, 0, false));
    }

    onClick = () => {
      let skipAmount = Array.from(document.querySelectorAll(".article")).length;
      console.log(skipAmount);
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
      var _this = this;

      if(_this._isMounted){
        _this.setState({oldArticles: this.state.articles});
        _this.setState({articles: []});
      }

      var queryString = `?query={"Date":{"$regex":"^[0-9]{2}-[0-9]{2}-${_this.state.yearWritten}"} }&skip=` + skipAmount + `&limit=` + this.state.onPageCount;
      
      var searchText = document.querySelector("#search-box").value;
      if(searchText.length > 0){
        queryString = `?query={"Title":{"$regex":"^` + searchText + `"},"Date":{"$regex":"^[0-9]{2}-[0-9]{2}-${this.state.yearWritten}"} }&skip=` + skipAmount + `&limit=` + this.state.onPageCount;
      }
      
      if(_this.state.sort !== undefined && _this.state.parameter !== undefined){
        if(_this.state.sort === "asc"){
          queryString += '&sort={"' + _this.state.parameter + '":1}';
        } else if(_this.state.sort === "desc"){
          queryString += '&sort={"' + _this.state.parameter + '":-1}';
        }
      }
      
      _this.get.apply(_this, ["/articles", queryString, undefined, append, _this._isMounted, "articles"]);
    }

    fetchArticlesCount() {
      this.get.apply(this, ["/articles", "/_count", undefined, false, this._isMounted, "totalArticlesCount"]);
    }

    checkCurrentCheckBox(current) {
      // clearing all the other check boxes
      Array.from(document.querySelectorAll("input[type=checkbox]")).forEach(function(box) {
        box.checked = false;
        box.removeAttribute("checked");
      });

      // checking the current box
      current.checked = true;
      current.setAttribute("checked", "checked");
    }

    onCategoryChange(e) {
      var _this = this;

      _this.checkCurrentCheckBox(e);
      
      //firing the request only if the button is checked
      if(e.checked) {
        var year = e.value;
        //TODO [GM]: Test the search text functionality and clear code where possible
        
        //setting the year of all articles on the page
        //this.setState is asynchronous!
        _this.setState({ yearWritten: year, articles: [] }, function() {
          var skipAmount = Array.from(document.querySelectorAll(".article")).length;
          _this.fetchArticles(_this.state.sort, _this.state.parameter, skipAmount, true);
        });
      }
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
        var queryString = `?query={"Title":{"$regex":"^${searchText}"} }`;

        this.get.apply(this, ["/articles", queryString, this.handleNotFound.bind(this), false, this._isMounted, "articles"]);
      }
    }

    componentDidMount() {
      var _this = this;

      _this._isMounted = true;

      // sticking a click event to all check box buttons
      Array.from(document.querySelectorAll("input[type=checkbox]")).forEach(function(e) {
        e.addEventListener("click", _this.onCategoryChange.bind(_this, e));
      });

      // Initial loading of the articles
      _this.fetchArticles(_this.state.sort, _this.state.perameter, 0);

      // Getting the count of the articles
      _this.fetchArticlesCount();

      let callback = _this.clearButtons;

      document.addEventListener('fetchStart', function() {
        callback();
      });

      document.addEventListener('fetchEnd', function() {
        callback();
      });
    }

    render() {
      return (
          <section id="articles" className="articles-container text-center">
            <header className="articles-header w-100">
              <span>Намерени са <i className="bold">{this.state.articles.length}</i> статии.</span>
              <div className="equal-shared-grid articles-search-box-elements w-70">
                <Select onChange={this.onChange.bind(this)}/>
                <div className="mx-10-auto p-10">
                 <input id="search-box" onKeyUp={this.onSearch} className="responsive-input custom-select font-16" placeholder="Търси по име..."/>
                </div>
              </div>
            </header>
            <ArticleYearsCheckBoxes />
            <section className="articles-part">
              <NotFound />
              <section className="three-fragments-grid">
                  {Array.from(this.state.articles).map((art) => {
                    let editedTitle = art.Title.replace(/[-?.!,]+/g, "").replace(/\s+/g, "-");
                    let titleParts = editedTitle.split("-");

                    if(titleParts.length > 3){
                      editedTitle = titleParts.slice(0, 3).join("-");
                    }
                    
                    editedTitle = "Лайфстайл-" + editedTitle;

                    let toRoute = "/article/" + editedTitle + "-" + art._id;
                    return (<Animated animationIn="fadeIn" key={art._id}>
                              <Link to={toRoute}>
                                <Card id={art._id} date={art.Date} views={art.views} cover={art.Cover} title={art.Title.substr(0, 20) + "..."}/>
                              </Link>
                            </Animated>);
                  })} 
              </section>
              <FontAwesomeIcon onClick={this.onClick} id="moreBtn" className="moreBtn text-nav mx-auto mt-25 display-block"  icon="chevron-circle-down" size="3x" />
              <FontAwesomeIcon onClick={this.onClick} id="noMoreBtn" className="text-dark-red mx-auto display-block noMoreBtn mt-25 display-block"  icon="times-circle" size="3x" />
            </section>
          </section>
    )
  }
}

export default ArticlesPage;