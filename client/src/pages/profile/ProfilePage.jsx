import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getProfile, updateProfile } from "../../services/profileService";

function ProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    headline: "",
    about: "",
    phone: "",
    location: "",
    college: "",
    degree: "",
    graduationYear: "",
    github: "",
    linkedin: "",
    portfolio: "",
    skills: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await getProfile();

      setProfile(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await updateProfile(profile);

      alert("Profile Updated Successfully");
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <h2>Loading...</h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        <h1 className="text-3xl font-bold">My Profile</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="font-medium">First Name</label>

            <input
              className="w-full mt-2 border rounded-lg p-3"
              value={profile.firstName}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  firstName: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="font-medium">Last Name</label>

            <input
              className="w-full mt-2 border rounded-lg p-3"
              value={profile.lastName}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  lastName: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div>
          <label className="font-medium">Headline</label>

          <input
            className="w-full mt-2 border rounded-lg p-3"
            value={profile.headline}
            onChange={(e) =>
              setProfile({
                ...profile,
                headline: e.target.value,
              })
            }
            placeholder="Full Stack Developer"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="font-medium">Phone</label>

            <input
              className="w-full mt-2 border rounded-lg p-3"
              value={profile.phone}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  phone: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="font-medium">Location</label>

            <input
              className="w-full mt-2 border rounded-lg p-3"
              value={profile.location}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  location: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="font-medium">College</label>

            <input
              className="w-full mt-2 border rounded-lg p-3"
              value={profile.college}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  college: e.target.value,
                })
              }
              placeholder="Government College of Technology"
            />
          </div>

          <div>
            <label className="font-medium">Degree</label>

            <input
              className="w-full mt-2 border rounded-lg p-3"
              value={profile.degree}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  degree: e.target.value,
                })
              }
              placeholder="B.E Computer Science"
            />
          </div>
        </div>

        <div>
          <label className="font-medium">Graduation Year</label>

          <input
            type="number"
            className="w-full mt-2 border rounded-lg p-3"
            value={profile.graduationYear}
            onChange={(e) =>
              setProfile({
                ...profile,
                graduationYear: e.target.value,
              })
            }
            placeholder="2026"
          />
        </div>

        <div>
          <label className="font-medium">GitHub</label>

          <input
            className="w-full mt-2 border rounded-lg p-3"
            value={profile.github}
            onChange={(e) =>
              setProfile({
                ...profile,
                github: e.target.value,
              })
            }
            placeholder="https://github.com/username"
          />
        </div>

        <div>
          <label className="font-medium">LinkedIn</label>

          <input
            className="w-full mt-2 border rounded-lg p-3"
            value={profile.linkedin}
            onChange={(e) =>
              setProfile({
                ...profile,
                linkedin: e.target.value,
              })
            }
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <div>
          <label className="font-medium">Portfolio</label>

          <input
            className="w-full mt-2 border rounded-lg p-3"
            value={profile.portfolio}
            onChange={(e) =>
              setProfile({
                ...profile,
                portfolio: e.target.value,
              })
            }
            placeholder="https://yourportfolio.com"
          />
        </div>

        <div>
          <label className="font-medium">Portfolio</label>

          <div>
            <label className="font-medium">Skills</label>

            <input
              className="w-full mt-2 border rounded-lg p-3"
              value={profile.skills}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  skills: e.target.value,
                })
              }
              placeholder="Java, Spring Boot, React, MongoDB"
            />

            <p className="text-sm text-gray-500 mt-2">
              Separate each skill with a comma.
            </p>
          </div>
        </div>

        <textarea
          rows={5}
          className="w-full mt-2 border rounded-lg p-3"
          value={profile.about}
          onChange={(e) =>
            setProfile({
              ...profile,
              about: e.target.value,
            })
          }
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}

export default ProfilePage;
