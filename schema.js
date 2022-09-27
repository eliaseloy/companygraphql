const { application } = require('express');
const { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType,
    } = require('graphql');
    
const Company = require('./orm/Company');
const Product = require('./orm/Product');

const ProductInputType = new GraphQLInputObjectType({
    name: 'ProductInput',
    fields: {
        idCompany: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        nameProduct: {
            type: new GraphQLNonNull(GraphQLString)
        },
        releasedAt: {
            type: new GraphQLNonNull(GraphQLString)
        },
        image: {
            type: new GraphQLNonNull(GraphQLString)
        },
    }
});

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        idCompany: {
            type: GraphQLInt
        },
        nameProduct: {
            type: GraphQLString
        },
        releasedAt: {
            type: GraphQLString
        },
        image: {
            type: GraphQLString
        },
        company: {
            type: CompanyType,
            resolve(parentValue) {
                return Company.find(parentValue.idCompany);
            }
        }
    })
});

const CompanyInputType = new GraphQLInputObjectType({
    name: 'CompanyInput',
    fields: {
        nameCompany: {
            type: new GraphQLNonNull(GraphQLString)
        },
        foundedIn: {
            type: new GraphQLNonNull(GraphQLString)
        },
        website: {
            type: new GraphQLNonNull(GraphQLString)
        },
    }
});

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: {
        id: {
            type: GraphQLInt
        },
        nameCompany: {
            type: GraphQLString
        },
        foundedIn: {
            type: GraphQLString
        },
        website: {
            type: GraphQLString
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parentValue, args) {
//                console.log('parentValue', parentValue);
//                console.log('args', args);
                return Product.findByCompanyId(parentValue.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            companies: {
                type: new GraphQLList(CompanyType),
                resolve() {
                    return Company.findAll();
                }
            },
            company: {
                type: CompanyType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(parentValue, args) {
                    return Company.find(args.id);
                }
            },
            products: {
                type: new GraphQLList(ProductType),
                resolve() {
                    return Product.findAll();
                }
            },
            product: {
                type: ProductType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(parentValue, args) {
                    return Product.find(args.id);
                }
            },
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'MutationType',
        fields: {
            createCompany: {
                type: CompanyType,
                args: {
//                    nameCompany: {
//                        type: new GraphQLNonNull(GraphQLString)
//                    },
//                    foundedIn: {
//                        type: new GraphQLNonNull(GraphQLString)
//                    },
//                    website: {
//                        type: new GraphQLNonNull(GraphQLString)
//                    },
                    input: {
                        type: new GraphQLNonNull(CompanyInputType)
                    }
                },
                resolve(parentValue, args) {
                    const {input} = args;

                    if (!(/^http/.test(input.website))) {
                            throw new Error('Website must initiate with http or https');
                    }
                    
                    return Company.create({
                        nameCompany: input.nameCompany,
                        foundedIn: input.foundedIn,
                        website: input.website
                    });
                }
            },
            removeCompany: {
                type: CompanyType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(parentValue, args) {
                    return Company.destroy(args.id);
                }
            },
            createProduct: {
                type: ProductType,
                args: {
                    input: {
                        type: new GraphQLNonNull(ProductInputType)
                    }
                },
                resolve(parentValue, args) {
                    const {input} = args;
                    return Product.create({
                        idCompany: input.idCompany,
                        nameProduct: input.nameProduct,
                        releasedAt: input.releasedAt,
                        image: input.image
                    });
                }
            }
        }      
    })
})