import React, { useState, useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { SupplierContext } from '../SupplierContext';

const SupplierPage = () => {
	const [supplierDetail, setSupplierDetail] = useContext(SupplierContext);

	const updateForm = (e) => {
		setSupplierDetail({ ...supplierDetail, [e.target.name]: e.target.value });
	};

	// Change the base URL to your deployed backend
	const BASE_URL = 'https://inventory-management-backend-ppyt.onrender.com/supplier';

	const handleAdd = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(BASE_URL, {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: supplierDetail.name,
					email: supplierDetail.email,
					phone: supplierDetail.phone,
					company: supplierDetail.company,
				}),
			});

			const responseData = await response.json();
			if (responseData.status === 'ok') {
				alert('Supplier added successfully');
				resetSupplierDetail();
			} else {
				alert('Failed to add Supplier: ' + responseData.message);
			}
		} catch (error) {
			console.error('Error adding supplier:', error);
			alert('An error occurred while adding the supplier.');
		}
	};

	const handleUpdate = async (e) => {
		e.preventDefault();

		if (!supplierDetail.id) {
			alert('Please enter a Supplier ID to update.');
			return;
		}

		const url = `${BASE_URL}/${supplierDetail.id}`;

		try {
			const response = await fetch(url, {
				method: 'PUT',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: supplierDetail.name,
					email: supplierDetail.email,
					phone: supplierDetail.phone,
					company: supplierDetail.company,
				}),
			});

			const responseData = await response.json();
			if (responseData.status === 'ok') {
				alert('Supplier updated successfully');
			} else {
				alert('Failed to update Supplier: ' + responseData.message);
			}
		} catch (error) {
			console.error('Error updating supplier:', error);
			alert('An error occurred while updating the supplier.');
		}
	};

	const handleDelete = async () => {
		if (!supplierDetail.id) {
			alert('Please enter a Supplier ID to delete.');
			return;
		}

		const url = `${BASE_URL}/${supplierDetail.id}`;

		try {
			const response = await fetch(url, {
				method: 'DELETE',
				headers: {
					accept: 'application/json',
				},
			});

			const result = await response.json();
			if (result.status === 'ok') {
				alert('Supplier deleted successfully');
				resetSupplierDetail();
			} else {
				alert('Supplier deletion failed: ' + result.message);
			}
		} catch (error) {
			console.error('Error deleting supplier:', error);
			alert('An error occurred while deleting the supplier.');
		}
	};

	const handleEmail = async (e) => {
		e.preventDefault();

		if (!supplierDetail.id) {
			alert('Please enter a Supplier ID to send email.');
			return;
		}

		const url = `https://inventory-management-backend-ppyt.onrender.com/email/${supplierDetail.id}`;

		try {
			const response = await fetch(url, {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					message: supplierDetail.email_msg,
					subject: supplierDetail.emailTitle,
				}),
			});

			const responseData = await response.json();
			if (responseData.status === 'ok') {
				alert('Email sent successfully');
			} else {
				alert('Failed to send email: ' + responseData.message);
			}
		} catch (error) {
			console.error('Error sending email:', error);
			alert('An error occurred while sending the email.');
		}

		setSupplierDetail((prev) => ({
			...prev,
			emailTitle: '',
			email_msg: '',
		}));
	};

	const resetSupplierDetail = () => {
		setSupplierDetail({
			name: '',
			email: '',
			phone: '',
			company: '',
			emailTitle: '',
			email_msg: '',
			id: '',
		});
	};

	return (
		<Card>
			<Card.Body>
				<Form>
					<Form.Group controlId='id'>
						<Form.Label>Supplier ID</Form.Label>
						<Form.Control
							type='text'
							name='id'
							value={supplierDetail.id}
							onChange={updateForm}
							placeholder='Supplier ID'
						/>
					</Form.Group>

					<Form.Group controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							name='name'
							value={supplierDetail.name}
							onChange={updateForm}
							placeholder="Supplier's Name"
						/>
					</Form.Group>

					<Form.Group controlId='email'>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type='email'
							name='email'
							value={supplierDetail.email}
							onChange={updateForm}
							placeholder='Email Address'
						/>
					</Form.Group>

					<Form.Group controlId='phone'>
						<Form.Label>Phone Number</Form.Label>
						<Form.Control
							type='tel'
							name='phone'
							value={supplierDetail.phone}
							onChange={updateForm}
							placeholder='Phone'
						/>
					</Form.Group>

					<Form.Group controlId='company'>
						<Form.Label>Company</Form.Label>
						<Form.Control
							type='text'
							name='company'
							value={supplierDetail.company}
							onChange={updateForm}
							placeholder='Company'
						/>
					</Form.Group>

					<Form.Group controlId='emailTitle'>
						<Form.Label>Email Title</Form.Label>
						<Form.Control
							type='text'
							name='emailTitle'
							value={supplierDetail.emailTitle}
							onChange={updateForm}
							placeholder='Email Title'
						/>
					</Form.Group>

					<Form.Group controlId='email_msg'>
						<Form.Label>Email Content</Form.Label>
						<Form.Control
							as='textarea'
							name='email_msg'
							value={supplierDetail.email_msg}
							onChange={updateForm}
							placeholder='Email Content'
						/>
					</Form.Group>

					<Button onClick={handleUpdate} className='btn btn-outline-info m-1' variant='primary'>
						Update
					</Button>

					<Button onClick={handleAdd} className='btn btn-outline-primary m-1' variant='primary'>
						Add Supplier
					</Button>

					<Button onClick={handleEmail} className='btn btn-outline-secondary m-1' variant='primary'>
						Send Email
					</Button>

					<Button onClick={handleDelete} className='btn btn-outline-danger m-1' variant='primary'>
						Delete
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default SupplierPage;

















// import React, { useState, useContext } from 'react';
// import { Form, Button, Card } from 'react-bootstrap';
// import { SupplierContext } from '../SupplierContext';

// const SupplierPage = () => {
// 	const [supplierDetail, setSupplierDetail] = useContext(SupplierContext);

// 	const updateForm = (e) => {
// 		setSupplierDetail({ ...supplierDetail, [e.target.name]: e.target.value });
// 	};

// 	// Change the port to 8001
// 	const BASE_URL = 'http://localhost:8001/supplier';

// 	const handleAdd = async (e) => {
// 		e.preventDefault();

// 		const response = await fetch(BASE_URL, {
// 			method: 'POST',
// 			mode: 'cors',
// 			cache: 'no-cache',
// 			credentials: 'same-origin',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			redirect: 'follow',
// 			referrerPolicy: 'no-referrer',
// 			body: JSON.stringify({
// 				name: supplierDetail['name'],
// 				email: supplierDetail['email'],
// 				phone: supplierDetail['phone'],
// 				company: supplierDetail['company'],
// 			}),
// 		});

// 		const responseData = await response.json();
// 		if (responseData.status === 'ok') {
// 			alert('Supplier added successfully');
// 		} else {
// 			alert('Failed to add Supplier');
// 		}

// 		// Reset the supplier detail
// 		setSupplierDetail({
// 			name: '',
// 			email: '',
// 			phone: '',
// 			company: '',
// 			emailTitle: '',
// 			email_msg: '',
// 			id: '', // Resetting ID as well
// 		});
// 	};

// 	const handleUpdate = async (e) => {
// 		e.preventDefault();

// 		if (!supplierDetail['id']) {
// 			alert('Please enter a Supplier ID to update.');
// 			return;
// 		}

// 		const url = `${BASE_URL}/${supplierDetail['id']}`;
// 		const response = await fetch(url, {
// 			method: 'PUT',
// 			mode: 'cors',
// 			cache: 'no-cache',
// 			credentials: 'same-origin',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			redirect: 'follow',
// 			referrerPolicy: 'no-referrer',
// 			body: JSON.stringify({
// 				name: supplierDetail['name'],
// 				email: supplierDetail['email'],
// 				phone: supplierDetail['phone'],
// 				company: supplierDetail['company'],
// 			}),
// 		});

// 		const responseData = await response.json();
// 		if (responseData.status === 'ok') {
// 			alert('Supplier updated successfully');
// 		} else {
// 			alert('Failed to update Supplier');
// 		}
// 	};

// 	const handleDelete = async () => {
// 		if (!supplierDetail['id']) {
// 			alert('Please enter a Supplier ID to delete.');
// 			return;
// 		}

// 		const url = `${BASE_URL}/${supplierDetail['id']}`;
// 		const response = await fetch(url, {
// 			method: 'DELETE',
// 			headers: {
// 				accept: 'application/json',
// 			},
// 		});

// 		const result = await response.json();
// 		if (result.status === 'ok') {
// 			setSupplierDetail({
// 				name: '',
// 				email: '',
// 				phone: '',
// 				company: '',
// 				emailTitle: '',
// 				email_msg: '',
// 				id: '', // Resetting ID after deletion
// 			});
// 			alert('Supplier deleted successfully');
// 		} else {
// 			alert('Supplier deletion failed');
// 		}
// 	};

// 	const handleEmail = async (e) => {
// 		e.preventDefault();

// 		if (!supplierDetail['id']) {
// 			alert('Please enter a Supplier ID to send email.');
// 			return;
// 		}

// 		const url = `http://localhost:8001/email/${supplierDetail['id']}`;
// 		const response = await fetch(url, {
// 			method: 'POST',
// 			mode: 'cors',
// 			cache: 'no-cache',
// 			credentials: 'same-origin',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			redirect: 'follow',
// 			referrerPolicy: 'no-referrer',
// 			body: JSON.stringify({
// 				message: supplierDetail['email_msg'],
// 				subject: supplierDetail['emailTitle'],
// 			}),
// 		});

// 		const responseData = await response.json();
// 		if (responseData.status === 'ok') {
// 			alert('Email sent successfully');
// 		} else {
// 			alert('Failed to send email');
// 		}

// 		setSupplierDetail({
// 			emailTitle: '',
// 			email_msg: '',
// 			id: supplierDetail['id'], // Keep the ID after sending email
// 		});
// 	};

// 	return (
// 		<Card>
// 			<Card.Body>
// 				<Form>
// 					<Form.Group controlId='id'>
// 						<Form.Label>Supplier ID</Form.Label>
// 						<Form.Control
// 							type='text'
// 							name='id'
// 							value={supplierDetail.id}
// 							onChange={updateForm}
// 							placeholder='Supplier ID'
// 						/>
// 					</Form.Group>

// 					<Form.Group controlId='name'>
// 						<Form.Label>Name</Form.Label>
// 						<Form.Control
// 							type='text'
// 							name='name'
// 							value={supplierDetail.name}
// 							onChange={updateForm}
// 							placeholder='Supplier&#39;s Name'
// 						/>
// 					</Form.Group>

// 					<Form.Group controlId='email'>
// 						<Form.Label>Email</Form.Label>
// 						<Form.Control
// 							type='email'
// 							name='email'
// 							value={supplierDetail.email}
// 							onChange={updateForm}
// 							placeholder='Email Address'
// 						/>
// 					</Form.Group>

// 					<Form.Group controlId='phone'>
// 						<Form.Label>Phone Number</Form.Label>
// 						<Form.Control
// 							type='number'
// 							name='phone'
// 							value={supplierDetail.phone}
// 							onChange={updateForm}
// 							placeholder='Phone'
// 						/>
// 					</Form.Group>

// 					<Form.Group controlId='company'>
// 						<Form.Label>Company</Form.Label>
// 						<Form.Control
// 							type='text'
// 							name='company'
// 							value={supplierDetail.company}
// 							onChange={updateForm}
// 							placeholder='Company'
// 						/>
// 					</Form.Group>

// 					<Form.Group controlId='emailTitle'>
// 						<Form.Label>Email Title</Form.Label>
// 						<Form.Control
// 							type='text'
// 							name='emailTitle'
// 							value={supplierDetail.emailTitle}
// 							onChange={updateForm}
// 							placeholder='Email Title'
// 						/>
// 					</Form.Group>

// 					<Form.Group controlId='email_msg'>
// 						<Form.Label>Email Content</Form.Label>
// 						<Form.Control
// 							as='textarea'
// 							name='email_msg'
// 							value={supplierDetail.email_msg}
// 							onChange={updateForm}
// 							placeholder='Email Content'
// 						/>
// 					</Form.Group>

// 					<Button onClick={handleUpdate} className='btn btn-outline-info m-1' variant='primary'>
// 						Update
// 					</Button>

// 					<Button onClick={handleAdd} className='btn btn-outline-primary m-1' variant='primary'>
// 						Add Supplier
// 					</Button>

// 					<Button onClick={handleEmail} className='btn btn-outline-secondary m-1' variant='primary'>
// 						Send Email
// 					</Button>

// 					<Button onClick={handleDelete} className='btn btn-outline-danger m-1' variant='primary'>
// 						Delete
// 					</Button>
// 				</Form>
// 			</Card.Body>
// 		</Card>
// 	);
// };

// export default SupplierPage;
