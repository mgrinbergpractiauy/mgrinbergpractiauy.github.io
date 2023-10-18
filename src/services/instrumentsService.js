import axios from "axios";

const GetInstrument = async (token) => {
  /*const instruments = await axios
    .post(
      import.meta.env.VITE_INSTRUMENT_SERVICE_BASE_URL + `?token=${token}`,
      {
        "Content-Type": "application/json",
      }
    )
    .catch(function (error) {
      if (error.response.data == "Usted no tiene acceso a este recurso.") {
        window.location.href = "/";
      }
    });
  const result = instruments.data;*/
  const result={};
  return result;
};

const InstrumentsServ = {
  getInstrument: GetInstrument
};

export default InstrumentsServ;
