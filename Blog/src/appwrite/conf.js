import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  database;
  bucket;
  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl) // Your API Endpoint
      .setProject(config.appWriteProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, userId, featuredImage, status }) {
    try {
      return await this.database.createDocument(
        config.appWriteDataBaseId,
        config.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Error in create post : ", error);
    }
  }

  async updatePost(slug, { title, slug, content, featuredImage, status }) {
    // slug for document id take it as argument
    try {
      return this.database.updateDocument(
        config.appWriteDataBaseId,
        config.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("error in update post", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        config.appWriteDataBaseId,
        config.appWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(" error in delete post ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getDocument(
        config.appWriteDataBaseId,
        config.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Error in the getPost", error);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        config.appWriteDataBaseId,
        config.appWriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("error in getPosts", error);
      return false;
    }
  }

  // file upload file service

  async uploadFile() {
    try {
      return await this.bucket.createFile(
        config.appWriteBucketId,
        ID.unique(),
        file
      );
      return true;
    } catch (error) {
      console.log("error in uploadfile");
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appWriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("error in delete file");
    }
  }

  // get file it is fast so no async await used

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(config.appWriteBucketId, fileId);
  }

  
}

const service = new Service();
export default service;
