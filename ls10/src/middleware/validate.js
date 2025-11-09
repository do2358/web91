export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                error: error.message ? error.message : error.details ? error.details[0].message : 'Validation failed'
            });
        }
        next();
    };
};

export const validateUser = (data) => {
    const errors = [];

    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
        errors.push('Name is required and must be a non-empty string');
    }

    if (!data.email || typeof data.email !== 'string') {
        errors.push('Email is required and must be a string');
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            errors.push('Email must be a valid email address');
        }
    }

    if (data.age !== undefined) {
        if (typeof data.age !== 'number' || data.age < 0 || data.age > 150) {
            errors.push('Age must be a number between 0 and 150');
        }
    }

    if (errors.length > 0) {
        return { error: { message: errors.join(', '), details: errors } };
    }

    return { error: null };
};

export const validateUserUpdate = (data) => {
    const errors = [];

    if (data.name !== undefined) {
        if (typeof data.name !== 'string' || data.name.trim().length === 0) {
            errors.push('Name must be a non-empty string');
        }
    }

    if (data.email !== undefined) {
        if (typeof data.email !== 'string') {
            errors.push('Email must be a string');
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                errors.push('Email must be a valid email address');
            }
        }
    }

    if (data.age !== undefined) {
        if (typeof data.age !== 'number' || data.age < 0 || data.age > 150) {
            errors.push('Age must be a number between 0 and 150');
        }
    }

    if (errors.length > 0) {
        return { error: { message: errors.join(', '), details: errors } };
    }

    return { error: null };
};

export const validatePost = (data) => {
    const errors = [];

    if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
        errors.push('Title is required and must be a non-empty string');
    }

    if (!data.content || typeof data.content !== 'string' || data.content.trim().length === 0) {
        errors.push('Content is required and must be a non-empty string');
    }

    if (!data.author || typeof data.author !== 'string') {
        errors.push('Author is required and must be a valid user ID');
    }

    if(data.coverImage !== undefined) {
        if (!data.coverImage.url || !data.coverImage.publicId) {
            errors.push('Cover image is required and must be a valid image');
        }
    }

    if(data.thumbnail !== undefined) {
        if (!data.thumbnail.url || !data.thumbnail.publicId) {
            errors.push('Thumbnail is required and must be a valid image');
        }
    }

    if (data.tags !== undefined) {
        if (!Array.isArray(data.tags)) {
            errors.push('Tags must be an array');
        } else {
            const invalidTags = data.tags.filter(tag => typeof tag !== 'string');
            if (invalidTags.length > 0) {
                errors.push('All tags must be strings');
            }
        }
    }

    if (errors.length > 0) {
        return { error: { message: errors.join(', '), details: errors } };
    }

    return { error: null };
};

export const validatePostUpdate = (data) => {
    const errors = [];

    if (data.title !== undefined) {
        if (typeof data.title !== 'string' || data.title.trim().length === 0) {
            errors.push('Title must be a non-empty string');
        }
    }

    if (data.content !== undefined) {
        if (typeof data.content !== 'string' || data.content.trim().length === 0) {
            errors.push('Content must be a non-empty string');
        }
    }

    if (data.author !== undefined) {
        if (typeof data.author !== 'string') {
            errors.push('Author must be a valid user ID');
        }
    }

    if (data.tags !== undefined) {
        if (!Array.isArray(data.tags)) {
            errors.push('Tags must be an array');
        } else {
            const invalidTags = data.tags.filter(tag => typeof tag !== 'string');
            if (invalidTags.length > 0) {
                errors.push('All tags must be strings');
            }
        }
    }

    if (errors.length > 0) {
        return { error: { message: errors.join(', '), details: errors } };
    }

    return { error: null };
};

export const validateObjectId = (req, res, next) => {
    const { id } = req.params;
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    
    if (!objectIdRegex.test(id)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid ID format'
        });
    }
    
    next();
};

