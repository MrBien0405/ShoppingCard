import React, { useEffect, useState } from "react";
import logo from "../../components/assets/Logo-Rikkei.png";
import img1 from "../../components/assets/apple-airpods-pro-2-2022-didongviet.png";
import "./ShoppingCard.scss";
import axios from "axios";

function ShoppingCard() {
  const [dataProduct, setDataProduct] = useState([]);
  const [valueInput, setVauleInput] = useState();
  const [dataCart, setDataCart] = useState([]);
  useEffect(() => {
    const fetDataProduct = async () => {
      const res = await fetch("http://localhost:3000/listproduct");
      const dataListProduct = await res.json();
      // console.log(dataListProduct);
      setDataProduct(dataListProduct);
    };
    fetDataProduct().catch(console.error);
  }, []);
  const handleClickSell = (e, i) => {
    let id = e.target.id;
    let quantity = 0;
    let price = 12;
    console.log(e.target.id);
    // console.log(dataProduct[0]);
    for (let i = 0; i < dataProduct.length; i++) {
      if (id !== dataProduct[i].id) {
        axios
          .post("http://localhost:3000/yourcart", {
            ...dataProduct[e.target.id - 1],
            quantity: 1,
            subtotal: quantity * price,
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .patch(`http://localhost:3000/yourcart/${id}`, {
            // ...dataProduct[e.target.id - 1],
            quantity: quantity + 1,
            subtotal: quantity * price,
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      console.log(id);
    }
  };
  const handleChangeInput = () => {
    setVauleInput(valueInput);
  };

  //   start
  const handleTest = (e, $id) => {
    const new_id = e.target.id;
    const check_cart = dataCart.filter((item) => item.id == new_id);
    if (check_cart.length !== 0) {
      const new_quantity = check_cart[0].quantity + 1;
      const new_cart_update = { ...check_cart[0], quantity: new_quantity };
      axios.patch(`http://localhost:3000/yourcart/${new_id}`, new_cart_update);
    } else {
      console.log(123);
    }
  };
  //   End

  const handleClickDelete = (e, i) => {
    let id = e.target.id;
    console.log(id);
    axios
      .delete(`http://localhost:3000/yourcart/${id}`)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   const handleClickUpdate = (e) => {
  //     let id = e.target.id;

  //     console.log(id);
  //     axios
  //       .put(`http://localhost:3000/yourcart/${id}`,{

  //       })
  //       .then((data) => console.log(data))
  //       .catch((error) => console.log(error));
  //   };
  useEffect(() => {
    axios
      .get("http://localhost:3000/yourcart")
      .then((axiosDataCart) => setDataCart(axiosDataCart.data))
      .catch((err) => console.log(err));
  }, []);
  //   console.log(dataCart);

  return (
    <>
      <div className='ShoppingCard'>
        <div className='ShopingCardContainer'>
          <div className='HeaderShoppingCard'>
            <img src={logo} alt='logo' />
            <h1>Project - Shopping Cart</h1>
          </div>
          <div className='ContentShoppingCard'>
            <div className='ContentShoppingCardContainer'>
              <div className='LeftContentShoppingCard'>
                <div className='panel-heading'>
                  <h2 className='panel-title'>List Products</h2>
                </div>

                {dataProduct.map((e, i) => (
                  <div className='panel-body'>
                    <div className='media-product'>
                      <div className='media-left'>
                        <a href='#'>
                          <img src={e.image} alt='' />
                        </a>
                      </div>
                      <div className='media-body'>
                        <h4 className='media-heading'>{e.name}</h4>
                        <p>{e.content}</p>
                      </div>
                      <div className='media-price'>
                        <input
                          // onClick={handleClickInput}
                          id={i}
                          onChange={handleChangeInput}
                          type='number'
                          name='quantity-product-1'
                          value={valueInput}
                          min='1'
                        />
                        <div className='Price'>
                          <p
                            id={e.id}
                            // onClick={handleClickSell}
                            onClick={handleTest}
                            className='text-media'
                          >
                            {e.price} USD
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='ContentShoppingCardContainer'>
              <div className='RightContentShoppingCard'>
                <div className='panel-danger'>
                  <div className='panel-heading'>
                    <h2 className='panel-title'>Your Card</h2>
                  </div>

                  <div className='panel-body'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th width='4%'>#</th>
                          <th>Name</th>
                          <th width='15%'>Price</th>
                          <th width='4%'>Quantity</th>
                          <th width='20%'>Subtotal</th>
                          <th width='25%'>Action</th>
                        </tr>
                      </thead>

                      {dataCart.map((e, i) => (
                        <tbody id='my-cart-body'>
                          <tr>
                            <th scope='row'>1</th>
                            <td>{e.name}</td>
                            <td>{e.price} USD</td>
                            <td>
                              <p>{e.quantity}</p>
                            </td>
                            <td>
                              <strong>{e.subtotal} USD</strong>
                            </td>
                            <td>
                              {/* <span
                                id={e.id}
                                onClick={handleClickUpdate}
                                className='update-cart-item'
                              > 
                                Update
                              </span> */}
                              <span
                                id={e.id}
                                onClick={handleClickDelete}
                                className='delete-cart-item'
                              >
                                Delete
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      ))}
                      <tfoot id='my-cart-footer'>
                        <tr>
                          <th className='textEmpty' colspan='6'>
                            Empty product in your cart
                          </th>
                        </tr>
                        <tr>
                          <td colspan='4'>
                            There are <b>5</b> items in your shopping cart.
                          </td>
                          <td colspan='2' className='total-price text-left'>
                            {/* {e.subtotal} USD */}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                <div className='alert-success'>
                  <span>Update </span>
                  <b>ivysaur</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingCard;
