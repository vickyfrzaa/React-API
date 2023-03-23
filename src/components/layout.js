import React from "react";
import { Link } from "react-router-dom";

export function Navbar(){
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom box-shadow py-3 mb-3">
            <div class="container">
                <Link class="navbar-brand" to="/">Navbar</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link text-dark" aria-current="page" to="/">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link text-dark" to="/products">Product</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav> 
    );
}