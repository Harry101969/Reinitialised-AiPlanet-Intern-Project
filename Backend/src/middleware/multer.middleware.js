import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp") //the cb always takes first parameter as null and in this case the second is the destination path where we need our temp data on the server to be stored before being sent to the cloudinary server
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.originalname) //this callback(cb) will give us the original name of the file which was set by the user
    }
})

export const upload = multer({ storage: storage });
