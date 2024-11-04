const axios = require("axios")

function sum(a, b){
    return a + b
}
const BACKEND_URL = "http://localhost:8000"

// describe("Authentication", ()=>{
//   test("User is able to sign up Only once", async()=>{
//     const username = "zixy" + Math.random();
//     const password = "123123";

//     const res = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//       username,
//       password,
//       type:"admin"
//     })
//     expect(res.statusCode).toBe(200)

//     const Updatedres = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//       username,
//       password,
//       type:"admin"
//     })
//     expect(Updatedres.statusCode).toBe(400)

//   })  

//   test('Sign up fails if the Username is empty',async()=>{
//     const username = `zixy-${Math.random()}`
//     const password = "123123"

//     const res = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//       password
//     })
//     expect(res.statusCode).toBe(400)
//   })

//   test("Signin Succeeds when the username and password are correct",async()=>{
//     const username = `zixy-${Math.random()}`
//     const password = "123123"

//     await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//       username,
//       password
//     })

//     const res = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
//       username,
//       password
//     })

//     expect(res.statusCode).toBe(200)
//     expect(res.body.token).toBeDefined()
//   })

//   test("Signin fails if the username and password are incorrect",async()=>{
//     const username = `zixy-${Math.random()}`
//     const password = "123123"

//     await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//       username,
//       password
//     })

//     const res = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
//       username:"wrongUsername",
//       password
//     })

//     expect(res.statusCode).toBe(403)
//   })
// })

describe("User information Endpoint", ()=>{
  beforeAll(()=>{
    console.log("before all was cl")
  })

  test("test 1",()=>{
    expect(1).toBe(1)
  })
  
  test("test 2",()=>{
    expect(1).toBe(1)
  })

  test("test 3",()=>{
    expect(1).toBe(1)
  })
})

// ls
