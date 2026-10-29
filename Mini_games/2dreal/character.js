// character.js - 진짜 사람 같은 관절 + 슈퍼 메가 굵기 하체 모듈 이다 

export class BioCharacterSystem {
    constructor(ctx) {
        this.ctx = ctx;
    }

    drawScene(thrustProgress = 0, particles = []) {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // 1. 배경 매트 그리드
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 2;
        for (let i = 0; i < ctx.canvas.width; i += 40) {
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, ctx.canvas.height); ctx.stroke();
        }

        ctx.strokeStyle = '#ff5722';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(30, 215);
        ctx.lineTo(490, 215);
        ctx.stroke();

        // 2. 여성 캐릭터 (진짜 사람 같은 관절 + 메가 굵기 허벅지/다리)
        let fHipX = 215;
        let fHipY = 160;
        
        let fKneeX = 295 + (thrustProgress * 7);
        let fKneeY = 192 - (thrustProgress * 5);
        let fAnkleX = 390;
        let fAnkleY = 212;

        // [여성 다리: 베지에 곡선으로 근육 볼륨 대폭 확장]
        ctx.fillStyle = '#ffcc99';
        ctx.beginPath();
        ctx.moveTo(fHipX - 20, fHipY + 10);
        // 허벅지 바깥쪽 근육 곡선
        ctx.quadraticCurveTo(fHipX + 40, fHipY + 45, fKneeX - 25, fKneeY);
        // 종아리 외측 두께
        ctx.quadraticCurveTo(fKneeX + 15, fKneeY + 20, fAnkleX, fAnkleY);
        ctx.lineTo(fAnkleX + 15, fAnkleY); 
        // 안쪽 복귀 곡선 (허벅지 안쪽 두께 보강)
        ctx.quadraticCurveTo(fKneeX - 10, fKneeY + 25, fKneeX + 15, fKneeY + 10);
        ctx.quadraticCurveTo(fHipX + 20, fHipY + 30, fHipX + 20, fHipY + 25);
        ctx.closePath();
        ctx.fill();

        // 여성 골반 관절
        ctx.fillStyle = '#e91e63';
        ctx.beginPath(); ctx.arc(fHipX, fHipY, 34, 0, Math.PI * 2); ctx.fill();

        // 여성 코어 상체
        ctx.fillStyle = '#ff4081';
        ctx.fillRect(fHipX - 105, fHipY - 25, 105, 44);

        // 여성 머리 및 롱헤어
        ctx.fillStyle = '#6d4c41';
        ctx.beginPath();
        ctx.moveTo(fHipX - 90, fHipY - 22);
        ctx.quadraticCurveTo(fHipX - 120, fHipY, fHipX - 105, fHipY + 25);
        ctx.lineTo(fHipX - 70, fHipY + 10);
        ctx.lineTo(fHipX - 75, fHipY - 22);
        ctx.fill();

        ctx.beginPath(); ctx.arc(fHipX - 80, fHipY - 12, 18, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffcc99';
        ctx.beginPath(); ctx.arc(fHipX - 68, fHipY - 10, 15, 0, Math.PI * 2); ctx.fill();

        // 3. 남성 캐릭터 (관절 연동 + 근육질 슈퍼 굵기 하체)
        ctx.save();
        let mBaseX = 205;
        let currentMaleX = mBaseX - (thrustProgress * 16);
        let mHipX = currentMaleX;
        let mHipY = 158;

        let mKneeX = mHipX + 40 + (thrustProgress * 8);
        let mKneeY = 190;
        let mAnkleX = mHipX + 75;
        let mAnkleY = 215;

        // [남성 다리/허벅지 두께 대폭 업그레이드]
        ctx.fillStyle = '#303f9f';
        ctx.beginPath();
        ctx.moveTo(mHipX - 15, mHipY + 10);
        ctx.quadraticCurveTo(mHipX + 25, mHipY + 40, mKneeX - 20, mKneeY);
        ctx.quadraticCurveTo(mKneeX + 15, mKneeY + 20, mAnkleX, mAnkleY);
        ctx.lineTo(mAnkleX + 18, mAnkleY);
        ctx.quadraticCurveTo(mKneeX - 5, mKneeY + 25, mKneeX + 15, mKneeY + 10);
        ctx.quadraticCurveTo(mHipX + 15, mHipY + 25, mHipX + 18, mHipY + 20);
        ctx.closePath();
        ctx.fill();

        // 남성 골반 관절
        ctx.fillStyle = '#303f9f';
        ctx.beginPath(); ctx.arc(mHipX, mHipY, 32, 0, Math.PI * 2); ctx.fill();

        // 남성 척추 및 상체
        ctx.translate(mHipX, mHipY);
        ctx.rotate(-0.45 + (thrustProgress * 0.03));

        ctx.fillStyle = '#3f51b5';
        ctx.fillRect(-12, -75, 45, 75);

        // 남성 팔 관절 (어깨 -> 팔꿈치 -> 손목)
        ctx.strokeStyle = '#3f51b5';
        ctx.lineWidth = 9;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(5, -35);
        ctx.lineTo(-30, -5);
        ctx.lineTo(-45, -25);
        ctx.stroke();

        ctx.fillStyle = '#212121';
        ctx.beginPath(); ctx.arc(20, -95, 15, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffcc99';
        ctx.beginPath(); ctx.arc(10, -88, 15, 0, Math.PI * 2); ctx.fill();

        ctx.restore();

        // 4. 파티클 이펙트
        for (let i = particles.length - 1; i >= 0; i--) {
            let p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
            if (p.life <= 0) particles.splice(i, 1);
        }
    }
}
