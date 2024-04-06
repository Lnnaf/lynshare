"use client";
import { PlateEditor } from "@/components/common/plate.editor";
import Container from "@/components/layouts/container";
import { Button } from "@/components/ui/button";
import ApiService, { API_PATHS } from "@/services/api.service";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ProfileManage() {
  const [data, setData] = useState(null);  

  const handleDataChange = (newData: any) => {
    setData(newData);
  }

  const {data: session} = useSession()
  const saveData = async () => {
    console.log(JSON.stringify(data));
    
    const post = {
      title: "test",
      content: JSON.stringify(data),
      thumbnail: "https://via.placeholder.com/150",
      authorId: session?.user.id,
    }
    try {
      // await ApiService.post(API_PATHS.addPost, post)
    } catch (error) {
      console.error(error)
    }
  }

  return (
      <Container>
        <PlateEditor data={data} onDataChange={handleDataChange} />
        <Button onClick={() => {
          saveData()
        }}>Submit</Button>
      </Container>
  );
}