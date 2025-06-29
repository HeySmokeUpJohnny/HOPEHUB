import React, { useEffect, useState } from 'react';
import { getDonation, toDonate } from "../services/PaymentService.js";

const Donation = () => {
    const [donation, setDonation] = useState(null);
    const [lastWonCoupon, setLastWonCoupon] = useState(null);
    const [isDonating, setIsDonating] = useState(false);
    const customerId = localStorage.getItem("customerId");

    useEffect(() => {
        handleGetDonation();
        // eslint-disable-next-line
    }, []);

    const handleGetDonation = async () => {
        try {
            const donationData = await getDonation(customerId);
            if (donationData.data) {
                setDonation(donationData.data);
            }
        } catch (error) {
            console.error("Failed to get donation data:", error);
        }
    };

    const handleDonate = async () => {
        setIsDonating(true);
        setLastWonCoupon(null);
        try {
            const result = await toDonate(customerId);

            // Gelen cevabı kontrol et.
            // Eğer cevapta geçerli bir 'seedDonation' varsa, doğrudan onu kullan.
            if (result.data && result.data.seedDonation) {
                setDonation(result.data.seedDonation);
            } else {
                // Eğer yoksa, en güncel veriyi sunucudan çekmeyi garanti et.
                // Bu, "Yükleniyor..." ekranında takılmayı önler.
                await handleGetDonation();
            }

            // Kupon kodunu her zaman ilk yanıttan kontrol et
            if (result.data && result.data.couponCode) {
                setLastWonCoupon(result.data.couponCode);
            }
        } catch (error) {
            console.error("Donation failed:", error);
            // Hata durumunda bile güncel durumu çekmeye çalışmak iyi bir fikir olabilir.
            await handleGetDonation();
        } finally {
            setIsDonating(false);
        }
    };

    if (!donation) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <span className="text-slate-600 text-xl font-medium">Yükleniyor...</span>
            </div>
        );
    }

    const count = donation.count || 0;
    const maxCount = 10;
    const progress = (count / maxCount) * 100;

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Fidan Bağışla, Kupon Kazan!</h2>
                <p className="text-slate-500 mb-8">
                    Her bağışla kupon kazanma şansına bir adım daha yaklaş!
                </p>

                <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="mt-3 text-base font-medium text-slate-700 mb-6">{count} / {maxCount} bağış</p>

                {lastWonCoupon && (
                    <div className="my-6 p-5 bg-emerald-50 border border-emerald-200 rounded-xl">
                        <h4 className="text-lg font-semibold text-emerald-800 mb-2">🎉 Tebrikler! İndirim Kuponu Kazandınız!</h4>
                        <p className="text-2xl font-bold text-emerald-600 bg-emerald-100 p-3 rounded-lg border-2 border-dashed border-emerald-300 tracking-widest">
                            {lastWonCoupon}
                        </p>
                    </div>
                )}

                <div className="mt-8">
                    <button
                        onClick={handleDonate}
                        disabled={isDonating}
                        className="w-full py-3 px-6 text-lg font-semibold text-white bg-emerald-500 rounded-xl shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDonating ? "Bağış İşleniyor..." : "100₺ Bağış Yap"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Donation;