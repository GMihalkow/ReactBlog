import React, { Component } from 'react';

class RequestModel extends Component {

    constructor(props){
        super(props);

        this.state = {}
    }

    get(path, queryParameters, callback, append, isMounted, propertyToSet) {
        let url = 
            process.env.REACT_APP_KINVEY_BASE_URL + 
            process.env.REACT_APP_KINVEY_APP_KEY + 
            path + 
            queryParameters;
        
        if(isMounted){
            fetch(encodeURI(url), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": process.env.REACT_APP_KINVEY_APP_AUTHORIZATION
                }
            })
            .then((res) => res.json())
            .then((result) => {
                if(Array.isArray(result)){
                    let tempResult = Array.from(result).filter((el) => {
                        if(el._id && el.Author && el.Title && el.Cover && el.Content && el.Date && el.views){
                            return true;
                        }

                        return false;
                    });
                    
                    if(append){
                        let newArticles = tempResult;
            
                        this.setState({articles: this.state.oldArticles.concat(newArticles)});   
                        
                        let noMoreBtn = document.querySelector("#noMoreBtn");
                        let moreBtn = document.querySelector("#moreBtn");
                        
                        if(moreBtn && noMoreBtn){
                            if(tempResult.length === 0){
                                moreBtn.style.display = "none";
                                noMoreBtn.style.display = "block";
                            } else {
                                moreBtn.style.display = "block";
                                noMoreBtn.style.display = "none";
                            }
                        }

                    } else {
                        let noMoreBtn = document.querySelector("#noMoreBtn");
                        let moreBtn = document.querySelector("#moreBtn");
                        
                        if(moreBtn && noMoreBtn){
                            if(tempResult.length === 0){
                                moreBtn.style.display = "none";
                                noMoreBtn.style.display = "block";
                            } else {
                                moreBtn.style.display = "block";
                                noMoreBtn.style.display = "none";
                            }
                        }
                        
                        this.setState({articles: tempResult});
                    }
                    
                    this.setState({[propertyToSet]: tempResult});
                } else if(typeof(result) === "object") {
                    let isValid = Object.keys(result).some((el) => {
                        if(result[el]){
                            return true;
                        }
                        return false;
                    });
                    
                    if(isValid || result.count){
                        if(result.count){
                            this.setState({[propertyToSet]: result.count});
                        } else {
                            this.incrementViews(path, queryParameters, result, callback, append, isMounted, propertyToSet);
                        }
                    }
                } else {
                    this.setState({[propertyToSet]: result});
                }

                if (callback) callback();
            });
        }
    }

    incrementViews(path, queryParameters, body, callback, append, isMounted, propertyToSet) {
        
        if(isMounted){
            let url = 
                process.env.REACT_APP_KINVEY_BASE_URL + 
                process.env.REACT_APP_KINVEY_APP_KEY + 
                path + 
                queryParameters;

            body.views++;
            
            fetch(encodeURI(url), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": process.env.REACT_APP_KINVEY_APP_AUTHORIZATION
                },
                body: JSON.stringify(body)
            }).then((res) => res.json())
            .then(() => {    
                this.setState({[propertyToSet]: body});
            });
        }
    }
}

export default RequestModel;