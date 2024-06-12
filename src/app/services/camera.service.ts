import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Camera } from '../Models/camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private apiUrl = 'http://localhost:5000/cameras'; // Assurez-vous de mettre le bon URL de votre API

  constructor(private http: HttpClient) { }

  getAllCameras(): Observable<Camera[]> {
    return this.http.get<Camera[]>(this.apiUrl);
  }

  getCameraById(id: string): Observable<Camera> {
    return this.http.get<Camera>(`${this.apiUrl}/${id}`);
  }

  createCamera(cameraData: Camera): Observable<Camera> {
    return this.http.post<Camera>(this.apiUrl, cameraData);
  }

  updateCamera(id: string, cameraData: Camera): Observable<Camera> {
    return this.http.put<Camera>(`${this.apiUrl}/${id}`, cameraData);
  }

  deleteCamera(id: string): Observable<Camera> {
    return this.http.delete<Camera>(`${this.apiUrl}/${id}`);
  }
}
