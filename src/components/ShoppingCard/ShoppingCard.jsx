import React, { useEffect, useState } from "react";
import logo from "../../components/assets/Logo-Rikkei.png";

import "./ShoppingCard.scss";

function ShoppingCard(props) {
  // console.log(props);

  let {
    handleSubmit,
    handleClickDelete,
    dataProduct,
    dataCart,
    valueInput,
  } = props;
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
                  <div key={i} className='panel-body'>
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
                        <form onSubmit={handleSubmit} action='' id={e.id}>
                          <input
                            id={e.id}
                            type='number'
                            name='name'
                            value={valueInput}
                            min='1'
                            defaultValue={1}
                          />
                          <div className='Price'>
                            <button
                              id={e.id}
                              className='text-media'
                            >
                              {e.price} USD
                            </button>
                          </div>
                        </form>
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
                        <tbody key={i} id='my-cart-body'>
                          <tr>
                            <th scope='row'>1</th>
                            <td>{e.name}</td>
                            <td>{e.price} USD</td>
                            <td>
                              <p className='text-quantity'>{e.quantity}</p>
                            </td>
                            <td className='text-subtotal'>
                              <strong>{e.new_subtotal} USD</strong>
                            </td>
                            <td className='delete-item'>
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
                          <th className='textEmpty' colSpan={6}>
                            Empty product in your cart
                          </th>
                        </tr>
                        <tr>
                          <td colSpan={4}>
                            There are <b>5</b> items in your shopping cart.
                          </td>
                          <td colSpan={2} className='total-price text-left'>
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
