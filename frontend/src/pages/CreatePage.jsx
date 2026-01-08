import React from 'react'
import { useState } from "react";
import { ArrowLeftIcon, PlusIcon } from "lucide-react"
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    } */

    setLoading(true);

    try{
      await api.post("/notes", {
        title,
        content
      });
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {      
      console.error("Error creating note", error);
      
      if (error.response){
        if (error.response && error.response?.status === 429) {
        toast.error("Slow down!! You're creating notes too fast", {
            duration:4000,
            icon: "💀"
        })
        } else if (error.response && error.response?.status === 500) {
        toast.error("Internal Server Error - Note may be missing content", {
            duration:4000,
            icon: "☠️"
        })
        } else {
          toast.error("Failed to create note");
        }
      } else {        
        toast.error("Slow down! You're creating notes too fast", {
            duration:4000,
            icon: "💀"
        })
      }
      return
    } finally {
      setLoading(false);
    }

  }

  return <div className="min-h-screen bg-base-200">
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link to={"/"} className="btn btn-ghost mb-6">
          <ArrowLeftIcon className="size-5" />
          Back to Box
        </Link>
        
        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Create New Jot</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  placeholder="Jot Title"
                  className="input input-bordered"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                  <textarea
                    placeholder="Write your jot here..."
                    className="textarea textarea-bordered h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
              </div>

              <div className="card-actions justify-end">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  <PlusIcon className="size-5 mr-2" />
                  {loading ? "Creating..." : "Create Jot"}
                </button>
              </div>

            </form>            
          </div>
        </div>
      </div>
    </div>
  </div>  
}

export default CreatePage