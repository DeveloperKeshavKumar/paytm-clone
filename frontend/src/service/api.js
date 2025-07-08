import { apiConnector } from "./apiConnector";
import { userEndpoints, accountEndpoints, transactionEndpoints } from "./apis";

export const signUp = async (data) => {
	try {
		const response = await apiConnector("POST", userEndpoints.SIGN_UP, data);
		return response;
	} catch (error) {
		throw error;
	}
};

export const signIn = async (data) => {
	try {
		const response = await apiConnector("POST", userEndpoints.SIGN_IN, data);
		return response;
	} catch (error) {
		throw error;
	}
};

export const editProfile = async (data, token) => {
	try {
		const response = await apiConnector("PUT", userEndpoints.EDITPROFILE, data, {
			Authorization: `Bearer ${token}`,
		});
		return response;
	} catch (error) {
		throw error;
	}
};

export const getAllUsers = async (token) => {
	try {
		const response = await apiConnector("GET", userEndpoints.ALL_USERS, null, {
			Authorization: `Bearer ${token}`,
		});
		return response;
	} catch (error) {
		throw error;
	}
};

export const getBalance = async (token) => {
	try {
		const response = await apiConnector("GET", accountEndpoints.GET_BALANCE, null, {
			Authorization: `Bearer ${token}`,
		});
		return response;
	} catch (error) {
		throw error;
	}
};

export const transferFunds = async (data, token) => {
	try {
		const response = await apiConnector("POST", accountEndpoints.TRANSFER_FUND, data, {
			Authorization: `Bearer ${token}`,
		});
		return response;
	} catch (error) {
		throw error;
	}
};

export const getTransactionHistory = async (token, params = {}) => {
	try {
		const queryParams = new URLSearchParams(params).toString();
		const url = queryParams ? `${transactionEndpoints.GET_HISTORY}?${queryParams}` : transactionEndpoints.GET_HISTORY;

		const response = await apiConnector("GET", url, null, {
			Authorization: `Bearer ${token}`,
		});
		return response;
	} catch (error) {
		throw error;
	}
};

export const getTransactionById = async (transactionId, token) => {
	try {
		const response = await apiConnector("GET", `${transactionEndpoints.GET_BY_ID}/${transactionId}`, null, {
			Authorization: `Bearer ${token}`,
		});
		return response;
	} catch (error) {
		throw error;
	}
};
