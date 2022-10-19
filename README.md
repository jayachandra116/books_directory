Books Directory

	All requests need to be authenticated
	
	As a user, i need to be able to create a user in db
		possible user attr:
			email
			pwd,
			createdAt,
			updatedAt,
			profileName,
			tokens
			
		
		1.login user	POST /users/login	create doc,create token,add token to tokens,
		2.lgout user	POST /users/logout	update user tokens by deleting present token from the request object
		3.get details	GET  /users/me	
		4.remove user	DELETE /users/me
		5.update user 	PATCH  /users/me	update pwd,profileName
		6.get all users		GET /users		
		7.get user of id	GET /users/:id
	
	As a user, i need to be able to get		GET

		1. Get all the details of all the books 	/books
		2. Get all the details of a single book		/books/:id
		3. Get books details in a sorted way		/books?sortBy=	recentPub | Title | ...
		4. Get books details in a conditioned way	/books?<getBy>= author=<value> | publishedYear=<> | tag=<> | subject=<>
	
	As a user, i need to be able to modify a book 		POST
		
		1.Post a request with a request body of updated object	/updateBook/:id
	
	As a user, i need to be able to delete a book from db		DELETE
		
		1.send a delete request		/deleteBook/:id
	
	
	