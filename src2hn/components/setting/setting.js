import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { isError } from "components/helpers/response";
import { toast } from "react-toastify";
import SettingService from "services/setting/setting";
import moment from "moment";

const Setting = () => {
  const dispatch = useDispatch();
  const {
    setValue,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    getData();
    isError(errors);
  }, []);

  // get form data
  const getData = () => {
    dispatch(SettingService.getData())
      .then((res) => {
        // 👇️ Example date and time in UTC
        const utcDate = res?.data?.reminder_time;
        const d = utcDate.toLocaleString();
        const time = moment(d.split("T")[1], "hh:mm A").format("HH:mm");
        setValue("ios_version", res?.data?.ios_version);
        setValue("reminder_time", time);
        setValue("android_version", res?.data?.android_version);
        setValue("id", res?.data?._id);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };
  const addSetting = (data) => {
    dispatch(SettingService.addSetting(data))
      .then((res) => {
        getData();
      })
      .catch((errors) => {
        toast.error(errors.data.message);
      });
  };

  return (
    <>
      <div
        style={{ borderRadius: "0.375rem" }}
        className="p-4 bg-white mb-3 d-flex flex-column col-lg-8"
      >
        <h5 className="hover-actions-trigger mb-4">Settings</h5>

        <div className="col">
          <Form.Group className="mb-3">
            <Form.Control type="hidden" name="id" id="id" {...register("id")} />
          </Form.Group>
          <Form onSubmit={handleSubmit(addSetting)}>
            <Form.Group className="mb-3">
              <Form.Label>Android version</Form.Label>
              <Form.Control
                type="text"
                name="android_version"
                id="android_version"
                {...register("android_version")}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ios version</Form.Label>
              <Form.Control
                type="text"
                name="ios_version"
                id="ios_version"
                isInvalid={!!errors.ios_version}
                {...register("ios_version")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Reminder Time</Form.Label>
              <Form.Control
                type="time"
                name="reminder_time"
                id="reminder_time"
                isInvalid={!!errors.reminder_time}
                {...register("reminder_time")}
              />
            </Form.Group>
            <Form.Group className="mt-5 d-flex justify-content-end w-100">
              <Button
                onClick={() => setValue("")}
                variant="primary"
                type="submit"
                className="ms-3"
              >
                Submit
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

// export default Interest;
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.Auth.isAuthenticated,
    accessToken: state.Auth.accessToken,
  };
};
export default connect(mapStateToProps)(Setting);
