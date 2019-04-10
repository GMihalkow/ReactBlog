import React, { Component } from '../../../../node_modules/react';
import { Link } from '../../../../node_modules/react-router-dom';
import Card from './Card';
import { Animated } from "react-animated-css";
import PropTypes from '../../../../node_modules/prop-types';
import { withStyles } from '../../../../node_modules/@material-ui/core/styles';
import AppBar from '../../../../node_modules/@material-ui/core/AppBar';
import Paper from '../../../../node_modules/@material-ui/core/Paper';
import Tabs from '../../../../node_modules/@material-ui/core/Tabs';
import NoSsr from '../../../../node_modules/@material-ui/core/NoSsr';
import Tab from '../../../../node_modules/@material-ui/core/Tab';
import axios from '../../../../node_modules/axios';
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
        value: 0,
    };

    handleChange = (event, value) => {
      this.setState({ value });
    };

    render() {
      function parseQueryString(queryString){
        // trimming the '?' in the beggining 
        let tempString = queryString.substr(1);
        
        // declaring the empty params obj
        let params = {};

        // spliting the parameters by &
        let parameters = tempString.split("&");
        
        Array.from(parameters).forEach((p) => {
          // spliting the key and value pair
          let temp = p.split("=");
          let key = temp[0];
          let value = temp[1];
          
          // creating the param
          params[key] = value;
        });

        return params;
      };

      const { classes } = this.props;
      const { value } = this.state;
      return (
        <div id="articles" className="w-70 mx-10-auto text-center">
            <AppBar position="static" className="mt-50" color="inherit">
                <Tabs 
                    value={value} 
                    indicatorColor="primary"
                    onChange={this.handleChange} 
                    variant="fullWidth">
                        <Tab label="2019" />
                        <Tab label="Всички" />
                </Tabs>
            </AppBar>
    {value === 0 && 
        <TabContainer>
        <Animated animationIn="fadeIn" animationInDelay={500}>
        <div className="text-start m-10 w-70">
        <select className="p-10 custom-select font-16">
            <option selected="selected">Сортирай</option>
            <option>По Дата</option>
            <option>По Име</option>
        </select>
        </div>
          <div className="four-fragments-grid">
          {Array.from(this.props.articles).map((art) => {
            let toRoute = "/article/" + art.Id;
            return (<Link to={toRoute}><Card date={art.Date} title={art.Title.substr(0, 10) + "..."}/></Link>);
          })} 
          </div>
        </Animated>
    </TabContainer>}
    {value === 1 && 
        <TabContainer>
        <Animated animationIn="fadeIn" animationInDelay={500}>
        <div className="text-start m-10 w-70">
        <select className="p-10 custom-select font-16">
            <option>Сортирай</option>
            <option>По Дата</option>
            <option>По Име</option>
        </select>
        </div>
            <div className="four-fragments-grid">
            </div>
        </Animated>
    </TabContainer>}
        </div>
    )
  }
}

export default ArticlesPage;