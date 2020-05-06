import React, { Component } from "react";
import { getData } from "../modules/productData";
import axios from "axios";

class DisplayProductData extends Component {
  state = {
    productData: [],
    message: {},
  };

  componentDidMount() {
    this.getProductData();
  }

  async getProductData() {
    let result = await getData();
    this.setState({ productData: result.data.products });
  }

  addToOrder = async (event) => {
    let id = event.target.parentElement.dataset.id;
    let result = await axios.post("http://localhost:3000/api/orders", {
      id: id,
    });
    this.setState({ message: { id: id, message: result.data.message } });
  };

  render() {
    let dataIndex;
    if (
      Array.isArray(this.state.productData) &&
      this.state.productData.length
    ) {
      dataIndex = (
        <div id="index">
          {this.state.productData.map((item) => {
            return (
              <div key={item.id} id={`product-${item.id}`}>
                {item.name}
                {item.description}
                {item.price}
                <button onClick={this.addToOrder}>
                  Add to order
                </button>

                <p className="message">{this.state.message.message}</p>
              </div>
            );
          })}
        </div>
      );
    }

    return <div>{dataIndex}</div>;
  }
}

export default DisplayProductData;
