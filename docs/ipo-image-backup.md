# IPO 이미지 백업 및 복구

## 운영 정책

- 원본: Hostinger VPS의 `/var/lib/foresightway/ipo-images`
- 주기: 매일 한국 시간 오전 3시 17분. 서버가 꺼져 있었으면 다음 부팅 후 누락된 실행을 수행한다.
- 저장 위치: GitHub 저장소의 `ipo-image-backups` 브랜치
- 보관 기간: 30일. 백업 실행 때 30일을 초과한 파일을 삭제한다.
- 저장소 용량 정책: 백업 브랜치는 매번 부모 없는 단일 커밋으로 교체하므로 삭제된 아카이브가 Git 이력에 계속 쌓이지 않는다.
- 실패 확인: VPS에서 `journalctl -u foresightway-ipo-image-backup.service`로 실행 결과와 실패 지점을 확인한다.
- IPO 이미지는 웹사이트에서 원래 공개되는 자산이며, 백업 브랜치에도 동일한 공개 범위로 저장된다.

## 수동 백업 실행

VPS에서 다음 명령을 실행한다.

```sh
sudo systemctl start foresightway-ipo-image-backup.service
sudo systemctl status foresightway-ipo-image-backup.service
sudo journalctl -u foresightway-ipo-image-backup.service -n 50 --no-pager
```

## 복구 절차

1. GitHub 저장소의 `ipo-image-backups` 브랜치에서 복원할 압축 파일과 같은 이름의 SHA-256 파일을 내려받는다.
2. 체크섬과 압축 파일을 같은 디렉터리에 둔 뒤 검증한다.

   ```sh
   sha256sum --check ipo-images-*.tar.gz.sha256
   tar --list --gzip --file=ipo-images-*.tar.gz
   ```

3. VPS에서 API 서비스를 멈추고 현재 디렉터리를 별도로 보존한다.

   ```sh
   sudo systemctl stop foresightway-api
   sudo mv /var/lib/foresightway/ipo-images \
     "/var/lib/foresightway/ipo-images.before-restore-$(date -u +%Y%m%dT%H%M%SZ)"
   sudo install -d -o www-data -g www-data -m 0750 /var/lib/foresightway/ipo-images
   ```

4. 검증된 압축 파일을 VPS로 전송한 뒤 복원한다.

   ```sh
   sudo tar --extract --gzip --file=/tmp/ipo-images-RESTORE.tar.gz \
     --directory=/var/lib/foresightway/ipo-images
   sudo chown -R www-data:www-data /var/lib/foresightway/ipo-images
   sudo find /var/lib/foresightway/ipo-images -type d -exec chmod 0750 {} +
   sudo find /var/lib/foresightway/ipo-images -type f -exec chmod 0640 {} +
   sudo systemctl start foresightway-api
   sudo systemctl is-active foresightway-api
   ```

5. 사이트에서 IPO 이미지를 열어 확인한다. 문제가 있으면 복원 디렉터리를 제거하고 3단계에서 보존한 디렉터리를 원래 이름으로 되돌린다.

## 복구 검증 기록

2026-09-17에 운영 이미지 디렉터리의 백업 압축 파일을 만들고, 별도 임시 디렉터리에 풀어 원본과 파일 목록 및 SHA-256을 비교하는 방식으로 복구 절차를 검증했다. 검증 중 운영 디렉터리와 API 서비스는 변경하지 않았다.