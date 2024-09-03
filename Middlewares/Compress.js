const zlib = require('zlib')

const Compress = (req,res,next)=>{
    // console.log(req.outputData)
    let data = req.outputData

    zlib.gzip(data, (err, output) => { 
        if (err) { 
            return res.status(500).send({"error": "error during compression", data: null});
        }

        res.set({
            'Content-Encoding': 'gzip',
            'Content-Type': 'application/json',  // Assuming the client expects JSON data
            'Content-Length': output.length,
        }); 
        res.send(output);
    });
}

module.exports = Compress