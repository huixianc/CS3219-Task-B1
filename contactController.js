// Import contact model
let Contact = require('./contactModel');

// Handle index actions
exports.index = function (req, res) {
    Contact.find(function (err, contacts) {
        if (err) {
            res.status(400).json({
                status: "error",
                message: "Could not retrieve contacts",
            });
            return;
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: contacts
        });
        return;
    });
};

// Handle create contact actions
exports.new = function (req, res) {
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.email = req.body.email ? req.body.email: contact.email;

    // save the contact and check for errors
    contact.save(function (err) {
        if (err) {
            res.status(400).json({
                status: "error",
                message: "Contact must have name and email",
            });
            return;
        }

        res.json({
            message: 'New contact created!',
            data: contact
        });
        return;
    });
};

// Handle view contact info
exports.view = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err) {
            res.status(400).json({
                status: "error",
                message: "Cannot display given contact, please check that it exists",
            });
            return;
        }
            
        res.json({
            message: 'Contact details loading..',
            data: contact
        });
        return;
    });
};

// Handle update contact info
exports.update = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err) {
            res.status(400).json({
                status: "error",
                message: "Cannot update given contact, please check that it exists",
            });
            return;
        }
            
        contact.name = req.body.name ? req.body.name : contact.name;
        contact.email = req.body.email ? req.body.email : contact.email;

        // save the contact and check for errors
        contact.save(function (err) {
            if (err) {
                res.status(400).json({
                    status: "error",
                    message: "Contact must have name and email",
                });
                return;
            }

            res.json({
                message: 'Contact Info updated',
                data: contact
            });
            return;
        });
    });
};

// Handle delete contact
exports.delete = function (req, res) {
    Contact.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err) {
            res.status(400).json({
                status: "error",
                message: "Cannot delete given contact, please check that it exists",
            });
            return;
        }
            
        res.json({
            status: "success",
            message: 'Contact deleted'
        });
        return;
    });
};