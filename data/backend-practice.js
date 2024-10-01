// using XMLHttpRequest in-built class

const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log(xhr.response);
});// load means the response has loaded

xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();

// xhr.response // can't use it here...since it takes time for response to travel thru internet and come back