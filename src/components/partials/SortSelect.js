import React, { Component } from 'react'

export class SortSelect extends Component {
  render() {
    return (
        <section className="text-start mx-10-auto p-10">
            <select id="sort-criteria" className="responsive-input custom-select font-16" onChange={this.props.onChange}>
                <option className="text-center">Сортирай</option>
                <option value="entryId:desc">Нови</option>
                <option value="views:desc">Популярни</option>
            </select>
        </section>
    )
  }
}

export default SortSelect;
