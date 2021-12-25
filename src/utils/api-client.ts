function client(endpoint: string, config: any) {
    return window
      .fetch(`https://api.github.com/users/${endpoint}`, config)
      .then(response => response.json())
  }
  
  export default client
  export {client}