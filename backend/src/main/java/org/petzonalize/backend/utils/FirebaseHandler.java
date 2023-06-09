package org.petzonalize.backend.utils;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;

@Service
public class FirebaseHandler {
	public List<String> getImagesFromFirebaseStorage() {
        List<String> imageUrls = new ArrayList<>();

        StorageClient storageClient = StorageClient.getInstance();
        Bucket bucket = storageClient.bucket("petzonalize.appspot.com");

        // List all the blobs (images) in the bucket
        Iterable<Blob> blobs = bucket.list().iterateAll();

        for (Blob blob : blobs) {
            // Get the URL of each image
            String imageUrl = blob.getMediaLink();
            imageUrls.add(imageUrl);
        }

        return imageUrls;
    }
	
	public String getImageUrlByName(List<String> imageUrls, String imageName) {
	    for (String imageUrl : imageUrls) {
	        if (imageUrl.contains(imageName)) {
	            return imageUrl;
	        }
	    }
	    return null;
	}
	
	public String getImageNameFromPath(String imagePath) {
        int lastSlashIndex = imagePath.lastIndexOf("/");
        if (lastSlashIndex != -1 && lastSlashIndex < imagePath.length() - 1) 
            return imagePath.substring(lastSlashIndex + 1);
        else 
            return imagePath;
    }
}
