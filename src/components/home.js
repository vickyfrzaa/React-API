import React, { useEffect, useState } from "react";
import { Products, showList, showForm, ProductList, ProductForm, product, props, content } from "./products";

export function Home(){
    const [content, setContent] = useState(<ProductList showForm={showForm} />);

    function showList(){
        setContent(<ProductList showForm={showForm} />);
    }

    function showForm(product){
        setContent(<ProductForm product={product} showList={showList} />);
    }
    return(
        <div className="container my-5">
            {content}
        </div>
    );

    function ProductList(props){
        const [products, setProducts] = useState([]);
    
        function fetchProducts(){
            fetch("http://localhost:3002/products")
            .then((response) => {
                if(!response.ok){
                    throw new Error("Not Data");
                }
                return response.json()
            })
            .then((data) => {
                // console.log(data);
                setProducts(data);
            })
            .catch((error) => console.log("Error: ", error));
        }
    
        // fetchProducts();
        useEffect(() => fetchProducts(), []);
    
        function deleteProduct(id){
            fetch('http://localhost:3002/products/' + id, {
                method: "DELETE"
            })
            .then((response) => response.json())
            .then((data) => fetchProducts());
        }
    
        return(
            <>
                <h2 className="text-center mb-3 pb-2">Home Page</h2>
                <button onClick={() => fetchProducts()} type="button" className="btn btn-outline-primary me-2"><i class="fas fa-redo-alt"></i></button>
                <div className="table-responsive-md pt-4 text-center">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((product, App) => {
                                    return(
                                        <tr key={App}>
                                            <td>{App + 1}</td>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.createdAt}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
    
    function ProductForm(props){
        const [errorMessage, setErrorMessage] = useState("");
        function handleSubmit(event){
            event.preventDefault();
    
            // read data
            const formData = new FormData(event.target);
    
            // convert
            const product = Object.fromEntries(formData.entries());
    
            // validation
            if(!product.name){
                console.log("Please Fill The Name !");
                setErrorMessage(
                    <div class="alert alert-danger" role="alert">
                        Please Fill The Name !
                    </div>
                )
                return;
            }
    
            if(props.product.id){
                // update
                fetch("http://localhost:3002/products/" + props.product.id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(product)
                })
                .then((response) => {
                    if(!response.ok){
                        throw new Error("Network was not OK");
                    }
                    return response.json()
                })
                .then((data) => props.showList())
                .catch((error) => console.log("Error: ", error));
    
            } else {
                // new product
                product.createdAt = new Date().toISOString()
                fetch("http://localhost:3002/products", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(product)
                })
                .then((response) => {
                    if(!response.ok){
                        throw new Error("Network was not OK");
                    }
                    return response.json()
                })
                .then((data) => props.showList())
                .catch((error) => console.log("Error: ", error));
            }
        }
        return(
            <>
                <h2 className="text-center mb-3">{props.product.id ? "Edit Product" : "Create New Product"}</h2>
    
                <div className="row">
                    <div className="col-md-8 mx-auto pt-4">
                        <div class="card text-center">
                            <div class="card-body">
                                {errorMessage}
                                <form className="pt-4" onSubmit={(event) => handleSubmit(event)}>
                                    {props.product.id && <div className="row mb-3">
                                        <label className="col-sm-4 col-form-label">ID</label>
                                        <div className="col-sm-8">
                                            <input className="form-control-plaintext" name="name" defaultValue={props.product.id} readonly/>
                                        </div>
                                    </div>}
    
                                    <div className="row mb-3">
                                        <label className="col-sm-4 col-form-label">Name</label>
                                        <div className="col-sm-8">
                                            <input className="form-control" name="name" defaultValue={props.product.name} />
                                        </div>
                                    </div>
    
                                    <div className="row">
                                        <div className="offset-sm-4 col-sm-4 d-grid">
                                            <button type="submit" className="btn btn-primary btn-sm me-3">Save</button>
                                        </div>
                                        <div className="col-sm-4 d-grid">
                                            <button onClick={() => props.showList()} type="button" className="btn btn-secondary me-2">Cancel</button>
                                        </div>
                                    </div>
                                </form>  
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}