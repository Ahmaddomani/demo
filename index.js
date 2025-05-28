// // const readLine = require("readline")
// const { log } = require("console")
// const fs = require("fs")
// const http = require("http")
// const url = require("url")
// const user = require("./modals/user")

// // const rl = readLine.createInterface({
// //     input : process.stdin ,
// //     output : process.stdout
// // })

// // rl.question("Type SomeThing Here : \n" , (name)=>{
// //     console.log("You Have Typed => ",name)
// //     rl.close()
// // })

// // rl.on("close",()=>{
// //     console.log('The Interface Has Been Closed')
// //     process.exit(0)
// // })

// // Async Method to Write and read

// //    fs.readFile("./output.txt","utf-8",(error , data)=>{
// //      console.log(data)
// //      fs.readFile("./output2.txt","utf-8",(error , data2)=>{
// //         console.log(data2)
// //         fs.readFile("./output3.txt","utf-8",(error , data3)=>{
// //             console.log(data3)
// //             fs.writeFile("./output4.txt","utf-8",(error , data3)=>{
// //                 console.log("All Things has been finished ")
// //             })
// //         })
// //     })
// //  })

// /*fs.writeFile("./Test.txt","Hey Pro",(e,data)=>{
//     log(data)
// })*/

// // ? -----------------------The Create Server Section Start -----------------------

// // ! require("http") // Above
// //create A server

// const htmlContent = fs.readFileSync("./mainHtmlFIle.html","utf-8")
// const prouducts = JSON.parse(fs.readFileSync("./Data/data.json","utf-8"))

// const server = http.createServer((req , res)=>{
//     // res.end("Hello From The server ")

//     let x = url.parse(req.url,true).query
//     log(x)

// if(req.url == "/") {
//     res.end(htmlContent.replace("{{%CONTENT%}}","Home"))
// }
//         res.writeHead(200,{'Content-Type' : 'text/html' ,
//             'my-header' : 'Go'
//         })
//         if(req.url == "/products") {
//             // res.writeHead(200,{'Content-Type' : 'application/json'})
//             res.end("prouduct")
//         }
//     console.log("A new rquest got ")

// })

// server.listen(5000,"localhost",()=>{
//     console.log('The Server has started ')
// })

// // ? -----------------------The Create Server Section End -----------------------

// // Create Emitter

// const emitter = new user

// emitter.on("userCreated",(name)=>{
//     log(`${name} has log in `)
// })

// // let data = ''
// // let line = "From Streaming\n"

// // for (let index = 0; index < 1e5; index++) {
// //     data += line

// // }

// // fs.writeFileSync("./Files/large.txt",data)

// emitter.emit("userCreated","mhmad")

// // ?-------------------Without Streaming
// // server.on("request",(req,res)=>{
// //     fs.readFile("./Files/large.txt","utf-8",(err,data)=>{
// //         if(err){
// //             res.end("Some Thing got Wrong")
// //             return
// //         } else{
// //             res.end(data)
// //         }
// //     })
// // })

// // ? ------------------With Streaming

// // server.on("request",(req,res)=>{
// //     let rs = fs.createReadStream("./Files/large.txt","utf-8")
// //     rs.on("data",(chunk)=>{
// //         fs.appendFiles("./Files/output.txt",chunk)
// //     })
// //     rs.on("error",(error)=>{
// //         res.end(error.message)
// //     })
// //     rs.on("end",()=>{res.end("<h1>All Things is Done </h1>")})
// //     })

// // server.on("request",(req,res)=>{
// //     let rs = fs.createReadStream("./Files/large.txt")
// //     rs.pipe(res)
// //     })

// //  Understanding Streams
