protocol AudioStreamManagerDelegate: AnyObject {
    func audioStreamManager(_ manager: AudioStreamManager, didReceiveAudioData data: Data, recordingTime: TimeInterval, totalDataSize: Int64)
    func audioStreamManager(_ manager: AudioStreamManager, didReceiveProcessingResult result: AudioAnalysisData?)
    
    func audioStreamManager(_ manager: AudioStreamManager, didPauseRecording pauseTime: Date)
    func audioStreamManager(_ manager: AudioStreamManager, didResumeRecording resumeTime: Date)
    func audioStreamManager(_ manager: AudioStreamManager, didUpdateNotificationState isPaused: Bool)
}
