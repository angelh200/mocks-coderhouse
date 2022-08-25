class Container {
    constructor(model) {
        this.model = model;
    }

    // Guarda el producto en la tabla
    async save(product) {
        try {
            const newProduct = new this.model(product);
            await newProduct.save();
        } catch (err) {
            throw new Error(err);
        }
    }

    // Actualiza el producto por su id
    async updateById(id, product) {
        try{
            await this.model.updateOne({ id }, product);
            return { success: true}
        } catch(err) {
            return { success: false, error: err.message };
        }
    }

    // Obtiene el producto con el id pedido
    async getById(id) {
        try {
            const doc = await this.model.find({ _id: id });
            return doc;
        } catch(err) {
            return {success: false, error: err.message};
        }
    }

    // Obtiene todos los mensajes de la tabla
    async getAll() {
        try {
            const docs = await this.model.find({});
            return docs;
        } catch(err) {
            console.log('No se puedo leer el archivo', err);
        }
    }

    // Elimina el producto por su id
    async deleteById(id) {
        try {
            await this.model.deleteOne({_id: id});
            return {success: true};
        } catch(err) {
            return { succes: false, err: err.message };
        }
    }

    // Elimina todos los mensajes de la tabla
    async deleteAll() {
        try {
            await this.model.deleteMany({});
            return { success: true };
        } catch (err) {
            return { succes: false, err: err.message };
        }
    }
}


module.exports = Container;