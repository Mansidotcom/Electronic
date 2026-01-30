import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";

import { setUser } from "@/redux/userSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import userLogo from "@/assets/mahadev1.jpg"
import MyOrder from "./MyOrder";


const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  //  FIX: userId Redux se
  const userId = user?._id;

  const [updateUser, setUpdateUser] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    phoneNo: user?.phoneNo || "",
    address: user?.address || "",
    city: user?.city || "",
    zipCode: user?.zipCode || "",
    profilePic: user?.profilePic || "",
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selectedFile),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User not found");
      return;
    } 

    const accessToken = localStorage.getItem("accessToken");

    try {
      const formData = new FormData();
      formData.append("firstname", updateUser.firstname);
      formData.append("lastname", updateUser.lastname);
      formData.append("email", updateUser.email);
      formData.append("phoneNo", updateUser.phoneNo);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("zipCode", updateUser.zipCode);

      if (file) {
        formData.append("profilePic", file); // backend match
      }

      const res = await axios.put(
        `http://localhost:8000/api/v1/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        localStorage.setItem("user",JSON.stringify(res.data.user));
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error("Failed to update profile");
    }
  };


  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <Tabs defaultValue="profile" className="max-w-7xl mx-auto items-center">

        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">


          <div>
            <div className="flex flex-col justify-center items-center bg-white">
              <h1 className="font-bold mb-7 text-2xl text-gray-800">Update Profile</h1>
              <div className="w-full flex gap-10 justify-center items-start px-7 max-w-2xl">

                {/* profile picture*/}
                <div className="flex flex-col items-center">
                  <img
                    src={updateUser.profilePic || userLogo}
                    alt="profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-pink-500"
                  />
                  <Label className="mt-2 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-1 w-40 ">
                    Change Picture
                    <Input
                      type="file"
                      name="profilePic"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </Label>
                </div>

                {/*profile form*/}
                <form onSubmit={handleSubmit} className="space-y-4 shadow-lg p-5 rounded-lg bg-white">
                  <div className="grid grid-col-2  gap-4">

                    <div>
                      <Label>First Name</Label>
                      <Input
                        type="text"
                        placeholder="enter your firstname"
                        name="firstname"
                        value={updateUser.firstname}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input
                        type="text"
                        placeholder="enter your lastname"
                        name="lastname"
                        value={updateUser.lastname}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <Label>Email</Label>
                      <Input value={updateUser.email} disabled />
                    </div>

                    <div>
                      <Label>Phone</Label>
                      <Input
                        type="text"
                        placeholder="enter your email"
                        name="phoneNo"
                        value={updateUser.phoneNo}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label>Address</Label>
                      <Input
                        type="text"
                        placeholder="enter your address"
                        name="address"
                        value={updateUser.address}
                        onChange={handleChange}
                      />
                    </div>
                      
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>City</Label>
                        <Input
                          type="text"
                          placeholder="enter your city"
                          name="city"
                          value={updateUser.city}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <Label>Zip Code</Label>
                        <Input
                          type="text"
                          placeholder="enter your zipCode"
                          name="zipCode"
                          value={updateUser.zipCode}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="bg-pink-600 text-white w-full">
                      Update Profile
                    </Button>
                  </div>
                </form>

              </div>

            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders">
         <MyOrder/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
