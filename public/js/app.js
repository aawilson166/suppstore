//for buy button must make schema require a number then update seed data and then make a function or do math in curly braces testing push & merge

class App extends React.Component {
	state = {
		item: '',
		price: '',
		quantity: '',
		image: '',
		products: []
	};

	//This function changes the state of the objects listen above
	handleChange = event => {
		this.setState({
			//the square brackets dynamically updates the objects property
			[event.target.id]: event.target.value
		});
	};

	//This function is what executes when we hit submit
	handleSubmit = event => {
		event.preventDefault();
		axios.post('/products', this.state).then(response => {
			this.setState({
				products: response.data,
				item: '',
				price: '',
				quantity: '',
				image: ''
			});
		});
	};

	deleteProduct = event => {
		axios.delete('/products/' + event.target.value).then(response => {
			this.setState({
				products: response.data
			});
		});
	};

	updateProduct = event => {
		event.preventDefault();
		const id = event.target.id;
		axios.put('/products/' + id, this.state).then(response => {
			this.setState({
				products: response.data,
				item: '',
				price: '',
				quantity: '',
				image: ''
			});
		});
    };
    
    // buyProduct = event => {
    //     this.setState({
    //     [event.target.quantity]: event.target.quantity-=1
    //     })
    // }
    

	//this function renders the info from the database onto the webpage on load
	componentDidMount = () => {
		axios.get('/products').then(response => {
			this.setState({
				products: response.data
			});
		});
    };
    


	render = () => {
		return (
			<div className ="container">
				<div>
					<h2>Products</h2>
					<div className='new-product-form'>
						<form onSubmit={this.handleSubmit}>
							<div>
								<label htmlFor='item'>
									Item
								</label>
								<input
									type='text'
									id='item'
									onChange={this.handleChange}
									value={this.state.item}
								/>
							</div>

							<div>
								<label htmlFor='price'>
									Price
								</label>
								<input
									type='text'
									id='price'
									onChange={this.handleChange}
									value={this.state.price}
								/>
							</div>

							<div>
								<label htmlFor='quantity'>
									Quantity
								</label>
								<input
									type='text'
									id='quantity'
									onChange={this.handleChange}
									value={this.state.quantity}
								/>
							</div>

							<div>
								<label htmlFor='image'>
									Image
								</label>
								<input
									type='text'
									id='image'
									onChange={this.handleChange}
									value={this.state.image}
								/>
							</div>

							<input
								type='submit'
								value='Add an Item'
							/>
						</form>
					</div>
				</div>
				<div className='productContainer'>
					{this.state.products.map(product => {
						return (
							<div className='productCard' key={product._id}>
								{product.item} <br />
								{product.price} <br />
                                Quantity: {product.quantity} <br />
								<img src={product.image} alt={product.item} /> <br />
                                {/* <button value={product._id} onClick={this.buyProduct}>
									Buy Product
								</button> */}
								<details>
									<summary>Update this Product</summary>
									<form id={product._id} onSubmit={this.updateProduct}>
										<label htmlFor='item'>Item</label>
										<br />
										<input type='text' id='item' onChange={this.handleChange} />
										<br />
										<label htmlFor='price'>Price</label>
										<br />
										<input
											type='text'
											id='price'
											onChange={this.handleChange}
										/>
										<br />

										<label htmlFor='quantity'>Quantity</label>
										<br />
										<input type='text' id='quantity' onChange={this.handleChange} />
										<br />

										<label htmlFor='image'>Image</label>
										<br />
										<input
											type='text'
											id='image'
											onChange={this.handleChange}
										/>
										<br />
										<input
											className='submit'
											type='submit'
											value='Update Product'
										/>
									</form>
                                    <button value={product._id} onClick={this.deleteProduct}>
									Delete Product
								</button>
								</details>
							</div>
						);
					})}
				</div>
			</div>
		);
	};
}

ReactDOM.render(<App></App>, document.querySelector('main'));
