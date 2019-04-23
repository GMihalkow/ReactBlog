import React, { Component } from '../../../../node_modules/react';
import { Link } from '../../../../node_modules/react-router-dom';
import Card from './Card';
import Pagging from '../../partials/Pagging';
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
        onPageCount: 12
    };

    handleChange = (event, value) => {
      this.setState({ value });
    };

    onChange = () => {
      let criterias = document.getElementById("sort-criteria").value.split(":");

      const validSortTypes = {
        asc: true,
        desc: true
      };

      const validParameterTypes = {
        Title: true,
        Date: true,
        views: true
      };

      let sort = criterias[1];
      let parameter = criterias[0];

        if(validSortTypes[sort] === true && validParameterTypes[parameter] === true){
          if(sort === "asc"){
            if(parameter === "views"){
              let sortedArticles = this.state.articles.sort((a, b) => a[parameter] - (b[parameter]));
              this.setState({articles: sortedArticles});
            } else {
              let sortedArticles = this.state.articles.sort((a, b) =>(a[parameter].localeCompare(b[parameter])));
              this.setState({articles: sortedArticles});
            }
          } else {
            if(parameter === "views"){
              let sortedArticles = this.state.articles.sort((a, b) => b[parameter] - (a[parameter]));
              this.setState({articles: sortedArticles});
            } else {
              let sortedArticles = this.state.articles.sort((a, b) => (b[parameter].localeCompare(a[parameter])));
              this.setState({articles: sortedArticles});
            }
          }
          
          this.setState({ sort: sort, parameter: parameter });
        }
    }

    componentDidMount() {
      // Initial loading of the articles
      if(this.state.sort === undefined || this.state.parameter === undefined){
        fetch(this.state.url + "?limit=" + this.state.onPageCount + "&skip=" + this.state.loadedCount, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
              "Content-Type": "application/json",
              "Authorization": "Basic a2lkX0hrTUFxTGo5TjpmNzE2ZjcxZThkNjk0OTIwYWUzZDQ5MGU5NDEwMTJjZQ=="
          }
        }).then((data) => {
          return data.json();
        }).then((articles) => {
          this.setState({articles: articles});
        });
      } else {
        this.setState({articles: this.state.articles});
      }      
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
              <input className="p-10 custom-select font-16" placeholder="Търси по име..."/>
            </div>
            </div>
              <div className="four-fragments-grid">
              {Array.from(this.state.articles).map((art) => {
                let toRoute = "/article/" + art._id;
                return (<Link key={art._id} to={toRoute}><Card date={art.Date} views={art.views} cover={art.Cover} title={art.Title.substr(0, 10) + "..."}/></Link>);
              })} 
              </div>
            </Animated>
          </TabContainer>}
          <Pagging/>
          </div>
    )
  }
}

export default ArticlesPage;