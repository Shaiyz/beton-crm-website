import api, { backend } from "../../api/index";
import {
  getLoadingLists,
  getLeadListsSuccess,
  getLeadListsFailure,
} from "./leads.reducer";
import { setAlertMessage } from "../alert/alert.action";

// get All lead
export const getAllLeads = () => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await backend.get(`/leads`);
    dispatch(getLeadListsSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getLeadListsFailure(err));
    }
  }
};

// export const getAvailableLeads =
//   (brand, pickupdate, dropdate, city, leadId) => async (dispatch, getState) => {
//     dispatch(getLoadingLists());
//     try {
//       const res = await api.get(
//         `/lead?availableFrom_date=${pickupdate}&availableTo_date=${dropdate}&brand=${brand}&city=${city}`
//       );
//       const filteredLeads = res?.data.data.filter(function (item) {
//         return item._id != leadId;
//       });
//       dispatch(getLeadAvailableListsSuccess(filteredLeads));
//     } catch (err) {
//       if (err.response) {
//         // dispatch(setAlertMessage(err.response.data.message, "warning"));
//         dispatch(getLeadListsFailure(err));
//       }
//     }
//   };

// export const searchLead = (query) => async (dispatch) => {
//   dispatch(getLoadingLists());
//   try {
//     const res = await api.get(
//       `/lead?availableFrom_date=${query.pickupdate}&availableTo_date=${query.dropoffdate}&brand=${query.brand}&city=${query.city}&lead_name=${query.lead_name}&is_driver=${query.is_driver}`
//     );
//     dispatch(getLeadSearch(res.data.data));
//   } catch (err) {
//     if (err.response) {
//       dispatch(setAlertMessage(err.response.data.message, "warning"));
//       dispatch(getLeadListsFailure(err));
//     }
//   }
// };

// export const getLead = (id) => async (dispatch, getState) => {
//   dispatch(getLoadingLists());
//   try {
//     const res = await api.get(`/lead?_id=${id}`);
//     dispatch(getLeadSuccess(res.data.data));
//   } catch (err) {
//     if (err.response) {
//       dispatch(setAlertMessage(err.response.data.message, "warning"));
//       dispatch(getLeadListsFailure(err));
//     }
//   }
// };

// export const getLeadByStatus = (status) => async (dispatch, getState) => {
//   dispatch(getLoadingLists());
//   try {
//     const leads = getState().leads;
//     dispatch(getLeadListsSuccess([]));
//   } catch (err) {
//     if (err.response) {
//       dispatch(setAlertMessage(err.response.data.message, "warning"));
//       dispatch(getLeadListsFailure(err));
//     }
//   }
// };

// export const updateLeadStatus = (body, id) => async (dispatch, getState) => {
//   dispatch(getLoadingLists());
//   await api
//     .put(`/vehicle/updateVehicleStatus/${id}`, body)
//     .then((response) => {
//       dispatch(updateLeadSuccess(response.data.data));
//       dispatch(setAlertMessage(response.data.message, "success"));
//     })
//     .catch((err) => {
//       if (err.response) {
//         dispatch(setAlertMessage(err.response.data.message, "error"));
//         dispatch(getLeadListsFailure(err));
//       }
//     });
// };

// export const updateEditLead = (body, id) => async (dispatch, getState) => {
//   dispatch(getEditLoadingLists());
//   await api
//     .put(`/vehicle/${id}`, body)
//     .then((response) => {
//       dispatch(updateLeadSuccess(response.data.data));
//       dispatch(setAlertMessage(response.data.message, "success"));
//     })
//     .catch((err) => {
//       if (err.response) {
//         dispatch(setAlertMessage(err.response.data.message, "error"));
//         dispatch(getLeadListsFailure(err));
//       }
//     });
// };

// export const addLead = (body) => async (dispatch, getState) => {
//   dispatch(getLoading());
//   try {
//     const res = await api.post(`/vehicle/add`, body);
//     dispatch(addLeadSuccess(res.data.data));
//     dispatch(setAlertMessage(res.data.message, "success"));
//     dispatch(getAllLeads());
//   } catch (err) {
//     if (err.response) {
//       dispatch(setAlertMessage(err.response.data.message, "error"));
//       dispatch(getLeadListsFailure(err));
//     }
//   }
// };
