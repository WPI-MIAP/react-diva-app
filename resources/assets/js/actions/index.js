import axios from 'axios';

export const addDrug = drug => {
	return {
		type: 'ADD_DRUG',
		drug
	}
}

export const setFilter = filter => {
	return {
		type: 'SET_FILTER',
		filter
	}
}

export const requestRules = status => {
	return {
		type: 'REQUEST_RULES',
		status
	}
}

export const receiveRules = (status, json) => {
	return {
		type: 'RECEIVE_RULES',
		status,
		rules: json.rules,
		drugs: json.drugs,
	    receivedAt: Date.now()
	}
}

export const requestDrugs = drug => {
	return {
		type: 'REQUEST_DRUGS',
		drug
	}
}

export const receiveDrugs = (drug, json) => {
	return {
		type: 'RECEIVE_DRUGS',
		drug,
		rules: json.rules,
		drugs: json.drugs,
	    receivedAt: Date.now()
	}
}

export function fetchRules(status) {
	return function (dispatch) {
		dispatch(requestRules(status));

		return axios.get('/csv/rules?status=' + status)
			.then(response => {
				dispatch(receiveRules(status, response.data))
			})
	}
}

export function fetchRulesByDrugName(drug) {
	return function (dispatch) {
		dispatch(requestDrugs(drug));

		return axios.get('/csv/rules?drug=' + drug)
			.then(response => {
				dispatch(receiveDrugs(drug, response.data))
			})
	}
}