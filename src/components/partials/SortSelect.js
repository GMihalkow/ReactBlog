import React, { Component } from 'react'

export class SortSelect extends Component {
  render() {
    return (
        <section className="text-start mx-10-auto p-10">
            <select id="sort-criteria" className="responsive-input custom-select font-16" onChange={this.props.onChange}>
                <option className="text-center">Сортирай</option>
                <option value="entryId:asc" >По дата възходящо</option>
                <option value="Title:asc">По име възходящо</option>
                <option value="entryId:desc">По дата низходящо</option>
                <option value="Title:desc">По име низходящо</option>
                <option value="views:asc">По преглеждания възходящо</option>
                <option value="views:desc">По преглеждания низходящо</option>
            </select>
        </section>
    )
  }
}

export default SortSelect;
