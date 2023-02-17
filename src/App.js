import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";
import ShoppingCard from "./components/ShoppingCard/ShoppingCard";
function App(props) {
  let {valueInput}= props
  const [dataProduct, setDataProduct] = useState([]);
  // const [valueInput, setVauleInput] = useState();
  const [dataCart, setDataCart] = useState([]);
  useEffect(() => {
    const fetDataProduct = async () => {
      const res = await fetch("http://localhost:3000/listproduct");
      const dataListProduct = await res.json();
      setDataProduct(dataListProduct);
    };
    fetDataProduct().catch(console.error);
  }, []);


  //   start
  const handleSubmit = (e, $id) => {
    e.preventDefault();

    console.log(e.target.name.value);
    const valueInput=e.target.name.value


    const new_id = e.target.id;
    const check_cart = dataCart.filter((item) => item.id == new_id);
    if (check_cart.length !== 0) {
      const new_quantity = check_cart[0].quantity + Number(valueInput)
      const new_price = check_cart[0].price;
      const new_subtotal = new_quantity * new_price;
      const new_cart_update = {
        ...check_cart[0],
        quantity: new_quantity,
        new_subtotal,
      };

      axios.patch(`http://localhost:3000/yourcart/${new_id}`, new_cart_update);
    } else {
      const new_quantity = Number(valueInput);
      const new_price = 12;
      const new_subtotal = new_quantity * new_price;
      console.log(new_subtotal);
      const new_cart = {
        ...dataProduct[new_id - 1],
        quantity: new_quantity,
        new_subtotal,
      };
      axios.post(`http://localhost:3000/yourcart`, new_cart);
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
  useEffect(() => {
    axios
      .get("http://localhost:3000/yourcart")
      .then((axiosDataCart) => setDataCart(axiosDataCart.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <ShoppingCard
        handleSubmit={handleSubmit}
    
        handleClickDelete={handleClickDelete}
        dataCart={dataCart}
        dataProduct={dataProduct}
      
      />
    </>
  );
}

export default App;
