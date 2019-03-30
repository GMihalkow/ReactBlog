import React, { Component } from 'react'

export class ArticlePartial extends Component {
  onMouseOver(e){
    let target = e.target;
    target.classList.add("animated");
    target.classList.add("rollIn");
    setTimeout(() => {
      target.classList.remove("animated");
      target.classList.remove("rollIn");
    }, 1000);
  }

  render() {
    return (
      <div className="mt-25">
          <a href="#" className="text-black"><h1 className="bold text-center m-10 font-40 p-10">Скъпи българино, стига с този псевдопатриотизъм!</h1></a>
          <p className="text-center m-10">Автор: <span className="bold">Илиана Симеонова</span> / 03 Март 2019</p>
          <img height="500" className="w-100 article-image" alt="article1" src="https://www.popsci.com/sites/popsci.com/files/styles/1000_1x_/public/images/2018/06/edinburgh_meadows_2008_middle_meadow_walk_by_catharine_ward_thompson.jpg?itok=ysmDaSjD&fc=50,50" />
          <p className="text-center">Обичай си страната всеки ден, не само днес! Драги ми, българино. Защо си патриот само дне... <a href="#">Прочети повече</a></p>
          <hr/>
      </div>
    )
  }
}

export default ArticlePartial;