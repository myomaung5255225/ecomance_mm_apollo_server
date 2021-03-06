import { ApolloError } from 'apollo-server-express';

export default {
	Query: {
		all_orders: async (_, _args, { Order }, info) => {
			try {
				const { page, limit } = _args;
				const query = Order.find({}).populate([ 'product_info', 'seller_info', 'buyer_info', 'delivery_info' ]);
				const orders = await Order.paginate(query, {
					page: page,
					limit: limit
				});
				if (orders) {
					return orders;
				} else {
					throw new ApolloError('Order not found!', 404);
				}
			} catch (error) {
				throw new ApolloError(error.message, 500);
			}
		},
		get_orders_by_seller: async (_, _args, { Order }, info) => {
			try {
				const { seller_id, page, limit } = _args;
				const query = Order.find({ seller_info: seller_id }).populate([
					'product_info',
					'seller_info',
					'buyer_info',
					'delivery_info'
				]);
				const orders = await Order.paginate(query, { limit: limit, page: page });
				if (orders) {
					return orders;
				} else {
					throw new ApolloError('Order not found!', 404);
				}
			} catch (error) {
				throw new ApolloError(error.message, 500);
			}
		},
		get_orders_by_buyer: async (_, _args, { Order }, info) => {
			try {
				const { buyer_id, page, limit } = _args;
				const query =  Order.find({ buyer_info: buyer_id }).populate([
					'product_info',
					'seller_info',
					'buyer_info',
					'delivery_info'
				]);
				const orders = await Order.paginate(query, { limit: limit, page: page });
				if (orders) {
					return orders;
				} else {
					throw new ApolloError('Order not found!', 404);
				}
			} catch (error) {
				throw new ApolloError(error.message, 500);
			}
		},
		assigned_orders: async (_, _args, { Order }, info) => {
			try {
				const { delivery_id, page, limit } = _args;
				const query = Order.find({ delivery_info: delivery_id }).populate([
					'product_info',
					'seller_info',
					'buyer_info',
					'delivery_info'
				]);
				const orders = await Order.paginate(query, { limit: limit, page: page });
				if (orders) {
					return orders;
				} else {
					throw new ApolloError('Order not found!', 404);
				}
			} catch (error) {
				throw new ApolloError(error.message, 500);
			}
		}
	},
	Mutation: {
		add_order: async (_, { InputOrder }, { Order }, info) => {
			try {
				const order = new Order(InputOrder);
				const result = await order.save();
				if (result) {
					return {
						message: 'Order created successfully!',
						status: true
					};
				} else {
					return {
						message: 'Order fail',
						status: false
					};
				}
			} catch (error) {
				throw new ApolloError(error.message, 500);
			}
		},
		update_order: async (_, { UpdateOrder }, { Order }, info) => {
			try {
				const update_order = await Order.findById(UpdateOrder.id);
				if (update_order) {
					update_order.status = UpdateOrder.status;
					update_order.product_info = UpdateOrder.product_info;
					update_order.buyer_info = UpdateOrder.buyer_info;
					update_order.seller_info = UpdateOrder.seller_info;
					update_order.delivery_info = UpdateOrder.delivery_info;
					const result = await update_order.save();
					if (result) {
						return {
							message: 'Order updated successfully',
							status: true
						};
					} else {
						return {
							message: 'Order update fail!',
							status: false
						};
					}
				} else {
					return {
						message: 'Your order not found!',
						status: false
					};
				}
			} catch (error) {
				throw new ApolloError(error.message, 500);
			}
		}
	}
};
