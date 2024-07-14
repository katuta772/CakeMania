import React, { useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import { ImageToBase64 } from "../utility/imageToBase64";
import { toast } from "react-hot-toast";

const NewProduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const uploadImage = async (e) => {
    const data = await ImageToBase64(e.target.files[0]);

    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, image, category, price } = data;

    if (name && image && category && price) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const fetchRes = await fetchData.json();

      toast(fetchRes.message);

      setData(() => {
        return {
          name: "",
          category: "",
          image: "",
          price: "",
          description: "",
        };
      });
    } else {
      toast("Please enter required fields!");
    }
  };

  return (
    <div className="pt-[40px]">
      <form className="m-auto w-full max-w-md shadow-[inset_0_0_5px_] shadow-slate-950/25 flex flex-col p-4 bg-white rounded-xl" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" className="bg-slate-200 p-1 my-1" name="name" onChange={handleOnChange} value={data.name} />

        <label htmlFor="category" className="mt-4">
          Category
        </label>
        <select className="bg-slate-200 p-1" id="category" name="category" onChange={handleOnChange} value={data.category}>
          <option value={"other"}>select category</option>
          <option value={"Pastry"}>Pastry</option>
          <option value={"Bakery"}>Bakery</option>
          <option value={"Cakes"}>Cakes</option>
          <option value={"Tarts"}>Tarts</option>
          <option value={"Donuts"}>Donuts</option>
        </select>

        <label htmlFor="image" className="mt-4">
          Image
          <div className="h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} className="h-full" />
            ) : (
              <span className="text-5xl">
                <MdDriveFolderUpload />
              </span>
            )}
            <input type="file" id="image" accept="image/*" onChange={uploadImage} className="hidden"></input>
          </div>
        </label>

        <label htmlFor="price" className="mt-4">
          Price
        </label>
        <input type="text" className="bg-slate-200 p-1" name="price" onChange={handleOnChange} value={data.price}></input>

        <label htmlFor="description" className="mt-4">
          Description
        </label>
        <textarea rows={3} className="bg-slate-200 p-1 resize-none" name="description" onChange={handleOnChange} value={data.description}></textarea>

        <div className="flex justify-center">
          <button className="bg-slate-500 hover:bg-slate-400 text-white text-medium font-bold drop-shadow mt-5 w-[100px] rounded-xl">Save</button>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;