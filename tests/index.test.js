const axios = require("axios");

// function sum(a, b) {
//   return a + b;
// }
const BACKEND_URL = "http://localhost:8000";

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

describe("User Metadata Endpoint", () => {
  let token = "";

  beforeAll(async () => {
    const username = `zixy-${Math.random()}`;
    const password = "123123";

    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: admin,
    });
    await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password,
    });

    token = res.data.token;
    const avatarRes = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, {
      ImageUrl: "https://cdn-icons-png.flaticon.com/128/4322/4322991.png",
      name: "Timmy",
    });

    avatarId = avatarRes.data.avatarId;
  });

  test("User can't  update their metadata with a wrong avatar id", async () => {
    const res = await axios.post(
      `${BACKEND_URL}/api/v1/user/metadata`,
      {
        avatarId: "askdbkjas89216398",
      },
      {
        authorization: `Bearer ${token}`,
      }
    );
    expect(res.statusCode).toBe(400);
  });

  test("User can  update their metadata with right avatar id", async () => {
    const res = await axios.post(
      `${BACKEND_URL}/api/v1/user/metadata`,
      {
        avatarId,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    expect(res.statusCode).toBe(200);
  });

  test("User is not able to update their metadata if the auth header is not present", async () => {
    const res = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {
      avatarId,
    });

    expect(res.statusCode).toBe(403);
  });
});

describe("User Avatar information", () => {
  let avatarId;
  let token;
  let userId;

  beforeAll(async () => {
    const username = `zixy-${Math.random()}`;
    const password = "123123";

    const signUpRes = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });
    userId = signUpRes.data.userId;

    const res = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password,
    });

    token = res.data.token;
    const avatarRes = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, {
      ImageUrl: "https://cdn-icons-png.flaticon.com/128/4322/4322991.png",
      name: "Timmy",
    });

    avatarId = avatarRes.data.avatarId;
  });

  test("Get back avatar information for a User ", async () => {
    const res = await axios.get(
      `${BACKEND_URL}/api/v1/user/metadata/bulk?ids=[${userId}]`
    );
    expect(res.data.avatars.length).toBe(1);
    expect(res.data.avatars[0].userId).toBe(userId);
  });

  test("Available avatars List The recently created avatar", async () => {
    const res = await axios.get(`${BACKEND_URL}/api/v1/avatars`);
    expect(res.data.avatars.length).not.toBe(0);
    const currentAvatar = res.data.avatars.find((x) => x.id == avatarId);
    expect(currentAvatar).toBeDefined();
  });
});

describe("Space Information", () => {
  let mapId;
  let element1Id;
  let element2Id;
  let adminToken;
  let adminId;
  let userToken;
  let userId;

  beforeAll(async () => {
    const username = `zixy-${Math.random()}`;
    const password = "123123";

    const signUpRes = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });

    adminId = signUpRes.data.userId;

    const res = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password,
    });

    adminToken= res.data.token;

    const UsersignUpRes = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username: username + "-user",
      password,
      type:"user"
    });

    userId = UsersignUpRes.data.userId;

    const userSigninRes = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username: username + "-user",
      password,
    });

    userToken= userSigninRes.data.token;

    const element1 = await axios.post(
      `${BACKEND_URL}/api/v1/admin/element`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
        width: 1,
        height: 1,
        static: true,
      },
      {
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      }
    );

    const element2 = await axios.post(
      `${BACKEND_URL}/api/v1/admin/element`,
      {
        imageUrl: "https://cdn-icons-png.flaticon.com/128/6404/6404680.png",
        width: 1,
        height: 1,
        static: true,
      },
      {
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      }
    );

    element1Id = element1.id;
    element2Id = element2.id;

    const map = await axios.post(
      `${BACKEND_URL}/api/v1/admin/map`,
      {
        thumbnail: "https://cdn-icons-png.flaticon.com/128/2204/2204655.png",
        dimension: "100x200",
        defaultElements: [
          {
            elementId: element1Id,
            x: 25,
            y: 50,
          },
          {
            elementId: element1Id,
            x: 35,
            y: 50,
          },
          {
            elementId: element2Id,
            x: 45,
            y: 50,
          },
        ],
      },
      {
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      }
    );

    mapId = map.id;
  });

  test("User is able to create a Space", async()=>{
    const mapRes = await axios.post(`${BACKEND_URL}/api/v1/space`,
      {
        "name" : "test-space-name",
        "dimension" : "100x200",
        "mapId": mapId
      },{
        headers: {
          authorization: `Bearer ${userToken}`
        }
      }
    );
    expect(mapRes.spaceId).toBeDefined()
  })

  test("User is able to create a Space without the mapId(empty space)", async()=>{
    const mapRes = await axios.post(`${BACKEND_URL}/api/v1/space`,
      {
        "name" : "test-space-name",
        "dimension" : "100x200",
      },{
        headers: {
          authorization: `Bearer ${userToken}`
        }
      }
    );
    expect(mapRes.spaceId).toBeDefined()
  })

  test("User is not able to create a Space without the mapId and dimensions", async()=>{
    const mapRes = await axios.post(`${BACKEND_URL}/api/v1/space`,
      {
        "name" : "test-space-name",
      },{
        headers: {
          authorization: `Bearer ${userToken}`
        }
      }
    );
    expect(mapRes.statusCode).toBe(400)
  })

  test("User is not able to Delete the space that doesn't exist", async()=>{
    const mapRes = await axios.post(`${BACKEND_URL}/api/v1/space/randomSpacethatDoesntExist`,{
      headers: {
        authorization: `Bearer ${userToken}`
      }
    })

    expect(mapRes.statusCode).toBe(404)
  })

  test("User is able to Delete the space that does exist ", async()=>{
    const mapRes = await axios.post(`${BACKEND_URL}/api/v1/space/`,{
      "name":"Test",
      "dimension": "100x200"
    },{
      headers: {
        authorization: `Bearer ${userToken}`
      }
    })

    const deleteRes = await axios.delete(`${BACKEND_URL}/api/v1/space/${mapRes.data.spaceId}`,{
      headers:{
        authorization: `Bearer ${userToken}`
      }
    })
    expect(deleteRes.status).toBe(200 )
  })

  test("User should not be able to delete the space that is created by the another user", async()=>{
    const mapRes = await axios.post(`${BACKEND_URL}/api/v1/space/`,{
      "name":"Test",
      "dimension": "100x200"
    },{
      headers: {
        authorization: `Bearer ${userToken}`
      }
    })

    const deleteRes = await axios.delete(`${BACKEND_URL}/api/v1/space/${mapRes.data.spaceId}`,{
      headers:{
        authorization: `Bearer ${adminToken}`
      }
    })
    expect(deleteRes.status).toBe(403)
  })

  test("Admin initially has no spaces", async()=>{
    const res = await axios.get(`${BACKEND_URL}/api/v1/space/all`,{
      headers: {
        authorization: `Bearer ${adminToken}`
      }
    });
    expect(res.data.spaces.length).toBe(0);
  })

  test("Admin initially  has no space", async()=>{
    const spaceCreateRes = await axios.post(`${BACKEND_URL}/api/v1/space/`,{
      "name":"Test",
      "dimension": "100x200"
    },{
      headers: {
        authorization: `Bearer ${adminToken}`
      }
    })

    const res = await axios.get(`${BACKEND_URL}/api/v1/space/all`,{
      headers: {
        authorization: `Bearer ${adminToken}`
      }
    });

    const filteredSpace = res.data.spaces.find(x => x.id == spaceCreateRes.data.spaceId);
    expect(res.spaces.length).toBe(1);
    expect(filteredSpace).toBeDefined()
  })

});

describe("Arena Endpoints", ()=>{
  let mapId;
  let element1Id;
  let element2Id;
  let adminToken;
  let adminId;
  let userToken;
  let userId;
  let spaceId

  beforeAll(async () => {
    const username = `zixy-${Math.random()}`;
    const password = "123123";

    const signUpRes = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });

    adminId = signUpRes.data.userId;

    const res = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password,
    });

    adminToken= res.data.token;

    const UsersignUpRes = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username: username + "-user",
      password,
      type:"user"
    });

    userId = UsersignUpRes.data.userId;

    const userSigninRes = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username: username + "-user",
      password,
    });

    userToken= userSigninRes.data.token;

    const element1 = await axios.post(
      `${BACKEND_URL}/api/v1/admin/element`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
        width: 1,
        height: 1,
        static: true,
      },
      {
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      }
    );

    const element2 = await axios.post(
      `${BACKEND_URL}/api/v1/admin/element`,
      {
        imageUrl: "https://cdn-icons-png.flaticon.com/128/6404/6404680.png",
        width: 1,
        height: 1,
        static: true,
      },
      {
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      }
    );

    element1Id = element1.id;
    element2Id = element2.id;

    const map = await axios.post(
      `${BACKEND_URL}/api/v1/admin/map`,
      {
        thumbnail: "https://cdn-icons-png.flaticon.com/128/2204/2204655.png",
        dimension: "100x200",
        defaultElements: [
          {
            elementId: element1Id,
            x: 25,
            y: 50,
          },
          {
            elementId: element1Id,
            x: 35,
            y: 50,
          },
          {
            elementId: element2Id,
            x: 45,
            y: 50,
          },
        ],
      },
      {
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      }
    );

    mapId = map.id;

    const space = await axios.post(`${BACKEND_URL}/api/v1/space`,{
      "name" : "Test",
      "dimension" : "100x200",
      "mapId": mapId
    },{
      headers: {
        authorization:`Bearer ${token}`
      }
    })

    spaceId = space.spaceId
  });

  test("Incorrect Space-Id will return the 400",async()=>{
    const res = await axios.get(`${BACKEND_URL}/api/v1/space/213756sdjbfjsadkfk`,{
      headers: {
        authorization: `Bearer ${userToken}`
      }
    });
    expect(res.statusCode).toBe(400)
  })

  test("Correct Space-Id will return the all the elements", async()=>{
    const res = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`,{
      headers: {
        authorization: `Bearer ${userToken}`
      }
    })
    expect(res.data.dimension).toBe("100x200")
    expect(res.data.elements.length).toBe(3)
  })

  test("Delete Endpoint is able to delete an Element", async()=>{
    const res = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`,{
      headers: {
        authorization: `Bearer ${userToken}`
      }
    })

    await axios.delete(`${BACKEND_URL}/api/v1/space/element`,{
      spaceId,
      elementId: res.data.elements[0].id
    },{
      headers: {
        authorization: `Bearer ${userToken}`
      }
    });

    const newRes = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`,{
      headers: {
        authorization: `Bearer ${userToken}`
      }
    })
    expect(newRes.data.elements.length).toBe(2)
  });

  test("Adding an elements as expected", async()=>{
    const res = await axios.post(`${BACKEND_URL}/api/v1/space/element`,{
      elementId: element1Id,
      spaceId: spaceId,
      "x": 10,
      "y": 50
    },{
      headers: {
        authorization: `Bearer ${userToken}`
      }
    })

    expect(res.statusCode).toBe(200)
  });

  test("Adding an elements outside the boundry will fails", async()=>{
    const res = await axios.post(`${BACKEND_URL}/api/v1/space/element`,{
      elementId: element1Id,
      spaceId: spaceId,
      "x": 1089649832,
      "y": 50934782
    },{
      headers: {
        authorization: `Bearer ${userToken}`
      }
    })

    const newRes = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`,{
      headers: {
        authorization: `Bearer ${userToken}`
      }
    })
    expect(newRes.data.elements.length).toBe(2)

    expect(res.statusCode).toBe(404)
  });

})

describe("Admin Endpoints", ()=>{
  
})