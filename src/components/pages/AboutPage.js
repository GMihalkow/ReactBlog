import React, { Component } from 'react';
import { Animated } from "react-animated-css";

export class AboutPage extends Component {
  render() {
    return (
      <section id="about-section" className="w-70 p-20 mx-10-auto">
        <header>
          <Animated animationIn="fadeInUp">
              <h2 id="about-me-heading" className="font-40 ml-5 w-70"><span itemProp="name"><strong>Илиана Симеонова</strong></span></h2>
              <hr className="bg-nav"/>
          </Animated>
        </header>
        <div className="three-to-one-grid">
          <Animated animationIn="zoomIn">
            <div className="about-content text-start mt-25 p-10 font-16">
                <p> Здравейте, скъпи читатели. Казвам се <strong>Илиана Симеонова</strong>. Завършила съм Езикова гимназия "Д-р Петър Берон" - гр. Кюстендил и по настоящем съм студентка в Софийския университет "Св. Климент Охридски" в специалност "Връзки с обществеността". Обожавам да пиша <em>статии</em> и да размишлявам по тайните на живота. Пиша проза и поезия от 8-годишна. Няма по-голямо удоволствие за мен от това читателите да оценяват труда ми. В този <em>Блог</em> ще видиш размисли и страсти по различни теми, които засягат нас, младите хора и голяма част от обществото. Благодаря ти, че си тук, читателю. Обещавам ти, че няма да те разочаровам. Приятно четене. </p>
                <div> Можете да посетите фейсбук страницата ми <a href="https://www.facebook.com/LifeGuide-367821623947963/">тук</a>.</div>
            </div>
          </Animated>
          <Animated animationIn="zoomIn">
            <div className="mt-25 p-10">
                <img className="br-5 cover-image" height="500" width="350" title="title" alt="Илиана Симеонова" src="https://firebasestorage.googleapis.com/v0/b/blog-583ce.appspot.com/o/about.jpg?alt=media&token=5f782553-4fd2-4489-b0f3-922c8a2090f5"/>
            </div>
          </Animated>
        </div>
      </section>
    )
  }
}

export default AboutPage;