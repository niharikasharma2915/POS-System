import { useEffect, useState } from "react";
import "../styles/dashboard.css";

const PRODUCT_API = "http://localhost:5000/api/product";

const POS = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [paymentMode, setPaymentMode] = useState("Cash");
    const [search, setSearch] = useState("");

    /* =========================
       FETCH PRODUCTS
    ========================== */
    const fetchProducts = async () => {
        try {
            const res = await fetch(PRODUCT_API);
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error("Failed to fetch products");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    /* =========================
       CART LOGIC
    ========================== */
    const addToCart = (product) => {
        const exists = cart.find(item => item._id === product._id);

        if (exists) {
            if (exists.qty >= product.stock) return;
            setCart(
                cart.map(item =>
                    item._id === product._id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                )
            );
        } else {
            if (product.stock <= 0) return;
            setCart([...cart, { ...product, qty: 1 }]);
        }
    };

    const increaseQty = (id) => {
        setCart(
            cart.map(item =>
                item._id === id && item.qty < item.stock
                    ? { ...item, qty: item.qty + 1 }
                    : item
            )
        );
    };

    const decreaseQty = (id) => {
        setCart(
            cart
                .map(item =>
                    item._id === id ? { ...item, qty: item.qty - 1 } : item
                )
                .filter(item => item.qty > 0)
        );
    };

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    /* =========================
       BILL GENERATION
    ========================== */
    const generateBill = async () => {
        if (cart.length === 0) {
            alert("Cart is empty");
            return;
        }

        await fetch(`${PRODUCT_API}/reduce-stock`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: cart })
        });

        alert(`Bill Generated\nPayment: ${paymentMode}\nTotal: ₹${total}`);

        setCart([]);
        setPaymentMode("Cash");
        fetchProducts();
    };

    /* =========================
       SEARCH FILTER
    ========================== */
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="row">

            {/* PRODUCTS SECTION */}
            <div className="col-md-7">
                <h4 className="mb-3">Products</h4>

                {/* SEARCH BAR */}
                <div className="input-group mb-3">
                    <span className="input-group-text">🔍</span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search product..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="row g-4">
                    {filteredProducts.map(p => (
                        <div className="col-md-4" key={p._id}>
                            <div className="dashboard-card text-center h-100">

                                {p.image && (
                                    <img
                                        src={`http://localhost:5000/uploads/${p.image}`}
                                        alt={p.name}
                                        className="img-fluid mb-2"
                                        style={{ height: "140px", objectFit: "contain" }}
                                    />
                                )}

                                <h6>{p.name}</h6>
                                <p className="fw-semibold">₹{p.price}</p>

                                <button
                                    className="btn btn-purple w-100 mt-2" style={{
                                        backgroundColor: "#7c3aed",
                                        color: "#ffffff",
                                        border: "none"
                                    }}
                                    disabled={p.stock <= 0}
                                    onClick={() => addToCart(p)}
                                >
                                    Add
                                </button>

                            </div>
                        </div>
                    ))}

                    {filteredProducts.length === 0 && (
                        <p className="text-muted">No products found</p>
                    )}
                </div>
            </div>

            {/* BILLING SECTION */}
            <div className="col-md-5">
                <h4 className="mb-3">Billing</h4>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th style={{ width: "120px" }}>Qty</th>
                            <th>Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cart.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    No items added
                                </td>
                            </tr>
                        ) : (
                            cart.map(item => (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-secondary me-1"
                                            onClick={() => decreaseQty(item._id)}
                                        >
                                            −
                                        </button>

                                        {item.qty}

                                        <button
                                            className="btn btn-sm btn-outline-secondary ms-1"
                                            onClick={() => increaseQty(item._id)}
                                        >
                                            +
                                        </button>
                                    </td>
                                    <td>₹{item.price * item.qty}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                <h5 className="mt-3">Total: ₹{total}</h5>

                <select
                    className="form-select my-3"
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                >
                    <option>Cash</option>
                    <option>Bank</option>
                </select>

                <button
                    className="btn btn-success w-100"
                    onClick={generateBill}
                >
                    Generate Bill
                </button>
            </div>

        </div>
    );
};

export default POS;
