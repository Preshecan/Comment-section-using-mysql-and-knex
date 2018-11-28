let cardBody = document.getElementById('commentSection');
	
  
loadComments = () => {
	fetch("http://localhost:3000/home")
	.then(data => data.json())
	.then(comments =>{
		for(let comment of comments){
			console.log(comment);
			cardBody.innerHTML += '<h5 class="username"> Name:' + comment.userName + '<h5>';
			cardBody.innerHTML += '<h6 class="date"> Date:' + comment.date + '<h6>';
			cardBody.innerHTML += '<p class="comment">' + comment.comment + '<p>';
		}
	})
	.catch(err => console.error(err))
}

insertComment = () => {
	let username = document.getElementById("name").value;
	let commentinput = document.getElementById("comment").value;
	if(username, commentinput){
		fetch('http://localhost:3000/comment', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body:JSON.stringify({
				username: username,
				comment: commentinput
			})
		}).then(response =>{
			console.log(response);
		})
	}
	
}