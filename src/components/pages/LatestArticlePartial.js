import React, { Component } from 'react'

export class LatestArticlePartial extends Component {
  render() {
    return (
        <div>
            <div className="two-to-four-grid w-70 mx-10-auto">
                <div>
                    <img className="article-image" width="100" height="50" src="https://www.popsci.com/sites/popsci.com/files/styles/1000_1x_/public/images/2018/06/edinburgh_meadows_2008_middle_meadow_walk_by_catharine_ward_thompson.jpg?itok=ysmDaSjD&fc=50,50" />
                </div>
                <div className="text-start bold p-10">
                    <a href="#" className="text-black">Скъпи българино, стиг...</a>
                </div>
            </div>
            <p className="text-end mx-auto w-70 font-14">03-03-2019</p>
            <hr className="w-70" />
        </div>
    )
  }
}

export default LatestArticlePartial;
