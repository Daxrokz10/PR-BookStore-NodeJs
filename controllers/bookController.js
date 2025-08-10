const Book = require('../models/bookSchema');

module.exports.home = (req,res)=>{
    res.render('index');
}

module.exports.showAddBook = (req,res)=>{
    res.render('pages/addBook');
};

module.exports.addBook = async(req,res)=>{
    try{
        const Book = require('../models/bookSchema');
        const book = new Book(req.body);
        await book.save();
        res.redirect('/view'); // Show the form again after saving
    }catch(error){
        console.log(error);
    }
}

module.exports.viewBook = async (req, res) => {
    try {
        const books = await Book.find({});
        res.render('pages/viewBook', { books });
    } catch (error) {
        console.log('Error fetching books:', error);
        res.status(500).send("Error loading books");
    }
}

module.exports.showEditBook = async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        return res.status(404).send("book not found");
    }else{
        console.log('Book found:', book);
        
    }
    res.render('pages/editbook', { book });
}
module.exports.editBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) { 
            return res.status(404).send("Book not found");
        }else{
            console.log('Book updated:', book);
        }
        res.redirect('/view'); // Redirect to the view page after editing
    } catch (error) {
        console.log('Error updating book:', error);
        res.status(500).send("Error updating book");
    } 
}

module.exports.deleteBook =async(req,res)=>{
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
    }catch(err){
        console.log('Error deleting book:', error);
        res.status(500).send("Error deleting book");
    } finally {
        res.redirect('/view');
    }    
}